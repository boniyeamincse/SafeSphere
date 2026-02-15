import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer, Enum
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.users import User
import enum

class CampaignStatus(str, enum.Enum):
    draft = "draft"
    active = "active"
    completed = "completed"

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(Enum(CampaignStatus), default=CampaignStatus.draft)

    creator = relationship("User")
    emails = relationship("PhishingEmail", back_populates="campaign")

class PhishingEmail(Base):
    __tablename__ = "phishing_emails"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    campaign_id = Column(UUID(as_uuid=True), ForeignKey("campaigns.id"))
    subject = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    open_count = Column(Integer, default=0)
    click_count = Column(Integer, default=0)
    dummy_credentials = Column(JSON, default=list)

    campaign = relationship("Campaign", back_populates="emails")
