from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID
from datetime import datetime
from app.database import get_db
from app.models.training import TrainingModule, UserTraining, Achievement
from app.models.users import User
from app.schemas.training import TrainingModuleCreate, TrainingModuleResponse, QuizSubmission, UserTrainingResponse
from app.utils.security import get_current_user

router = APIRouter()

@router.post("/", response_model=TrainingModuleResponse)
async def create_training_module(
    module: TrainingModuleCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    module_data = module.dict()
    module_data['created_by'] = current_user.id
    new_module = TrainingModule(**module_data)
    db.add(new_module)
    await db.commit()
    await db.refresh(new_module)
    return new_module

@router.get("/", response_model=List[TrainingModuleResponse])
async def read_training_modules(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TrainingModule).offset(skip).limit(limit))
    modules = result.scalars().all()
    return modules

@router.get("/{module_id}", response_model=TrainingModuleResponse)
async def read_training_module(module_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TrainingModule).where(TrainingModule.id == module_id))
    module = result.scalars().first()
    if module is None:
        raise HTTPException(status_code=404, detail="Training module not found")
    return module

@router.post("/{module_id}/submit", response_model=UserTrainingResponse)
async def submit_quiz(
    module_id: UUID, 
    submission: QuizSubmission, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. Fetch Training Module
    result = await db.execute(select(TrainingModule).where(TrainingModule.id == module_id))
    module = result.scalars().first()
    if not module:
        raise HTTPException(status_code=404, detail="Training module not found")

    # 2. Score Calculation
    # Expected quiz structure: {"questions": [{"id": "q1", "correct_answer": "A"}, ...]}
    # Submission structure: {"answers": {"q1": "A", "q2": "B"}}
    
    quiz_data = module.quiz or {}
    questions = quiz_data.get("questions", [])
    total_questions = len(questions)
    
    if total_questions == 0:
        score = 100 # No questions means strictly reading = 100%
    else:
        correct_count = 0
        user_answers = submission.answers
        
        for q in questions:
            q_id = q.get("id")
            correct_ans = q.get("correct_answer")
            user_ans = user_answers.get(q_id)
            
            if user_ans == correct_ans:
                correct_count += 1
                
        score = int((correct_count / total_questions) * 100)

    # 3. Update or Create UserTraining Record
    result = await db.execute(select(UserTraining).where(
        UserTraining.user_id == current_user.id,
        UserTraining.module_id == module_id
    ))
    user_training = result.scalars().first()
    
    if not user_training:
        user_training = UserTraining(
            user_id=current_user.id,
            module_id=module_id,
        )
        db.add(user_training)
    
    # Update progress and score
    user_training.quiz_score = score
    user_training.progress = 100 # Assumed completed upon quiz submission
    user_training.completed_at = datetime.utcnow()
    
    await db.commit()
    await db.refresh(user_training)
    
    # 4. Check for Achievements (Simple Logic: Score >= 80)
    if score >= 80:
        # Check if already awarded
        badge_name = f"Mastered: {module.title}"
        result = await db.execute(select(Achievement).where(
            Achievement.user_id == current_user.id,
            Achievement.badge_name == badge_name
        ))
        existing_badge = result.scalars().first()
        
        if not existing_badge:
            new_badge = Achievement(user_id=current_user.id, badge_name=badge_name)
            db.add(new_badge)
            await db.commit()

    return user_training
