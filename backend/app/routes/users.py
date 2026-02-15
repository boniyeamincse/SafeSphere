from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID
from app.database import get_db
from app.models.users import User, UserRole
from app.models.training import Achievement
from app.schemas.auth import UserResponse
from app.schemas.training import AchievementResponse
from app.utils.security import verify_password, get_current_user

router = APIRouter()

# TODO: Add real dependency for current_user
# For MVP, we'll just implement the endpoints

@router.get("/me/achievements", response_model=List[AchievementResponse])
async def read_my_achievements(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Achievement).where(Achievement.user_id == current_user.id))
    achievements = result.scalars().all()
    return achievements

@router.get("/", response_model=List[UserResponse])
async def read_users(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).offset(skip).limit(limit))
    users = result.scalars().all()
    return users

@router.get("/{user_id}", response_model=UserResponse)
async def read_user(user_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
