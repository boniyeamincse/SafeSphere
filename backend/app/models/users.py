import uuid
from datetime import datetime
from sqlalchemy import Column, String, Enum, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class UserRole(str, enum.Enum):
    admin = "admin"
    trainer = "trainer"
    member = "member"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.member)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Foreign Key to Group
    group_id = Column(UUID(as_uuid=True), ForeignKey("groups.id"), nullable=True)
    group = relationship("Group", back_populates="users")
