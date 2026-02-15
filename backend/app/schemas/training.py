from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class TrainingModuleBase(BaseModel):
    title: str
    content: str
    quiz: Dict[str, Any] = {}

class TrainingModuleCreate(TrainingModuleBase):
    pass

class TrainingModuleResponse(TrainingModuleBase):
    id: UUID
    created_by: UUID
    class Config:
        from_attributes = True

class QuizSubmission(BaseModel):
    answers: Dict[str, Any]

class UserTrainingResponse(BaseModel):
    id: UUID
    user_id: UUID
    module_id: UUID
    progress: int
    quiz_score: int
    completed_at: Optional[datetime]
    class Config:
        from_attributes = True

class AchievementResponse(BaseModel):
    id: UUID
    user_id: UUID
    badge_name: str
    awarded_at: datetime
    class Config:
        from_attributes = True
