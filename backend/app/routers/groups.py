from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from typing import List
from uuid import UUID

from app.database import get_db
from app.models.groups import Group as GroupModel
from app.schemas.groups import Group as GroupSchema, GroupCreate, GroupUpdate

router = APIRouter()

@router.get("/", response_model=List[GroupSchema])
async def read_groups(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    result = await db.execute(select(GroupModel).offset(skip).limit(limit))
    groups = result.scalars().all()
    return groups

@router.post("/", response_model=GroupSchema, status_code=status.HTTP_201_CREATED)
async def create_group(group: GroupCreate, db: Session = Depends(get_db)):
    result = await db.execute(select(GroupModel).filter(GroupModel.name == group.name))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Group already exists")
    
    db_group = GroupModel(**group.model_dump())
    db.add(db_group)
    await db.commit()
    await db.refresh(db_group)
    return db_group

@router.delete("/{group_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_group(group_id: UUID, db: Session = Depends(get_db)):
    result = await db.execute(select(GroupModel).filter(GroupModel.id == group_id))
    group = result.scalars().first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    await db.delete(group)
    await db.commit()
    return None
