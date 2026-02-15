from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class GroupBase(BaseModel):
    name: str
    description: Optional[str] = None

class GroupCreate(GroupBase):
    pass

class GroupUpdate(GroupBase):
    name: Optional[str] = None

class Group(GroupBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
