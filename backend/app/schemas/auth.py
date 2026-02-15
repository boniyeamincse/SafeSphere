from typing import Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID
from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    trainer = "trainer"
    member = "member"

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: UserRole = UserRole.member

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: UUID
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    email: EmailStr
    new_password: str
    token: str
