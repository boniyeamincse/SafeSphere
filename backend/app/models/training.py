import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.users import User

class TrainingModule(Base):
    __tablename__ = "training_modules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    quiz = Column(JSON, default=dict)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    creator = relationship("User")

class UserTraining(Base):
    __tablename__ = "user_training"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    module_id = Column(UUID(as_uuid=True), ForeignKey("training_modules.id"))
    progress = Column(Integer, default=0)
    quiz_score = Column(Integer, default=0)
    completed_at = Column(DateTime, nullable=True)

    user = relationship("User")
    module = relationship("TrainingModule")

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    badge_name = Column(String, nullable=False)
    awarded_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
