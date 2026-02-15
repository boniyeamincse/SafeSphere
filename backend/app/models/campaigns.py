import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer, Enum, Boolean, Table
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.users import User
import enum

# Association Table for Campaign <-> Groups
campaign_groups = Table(
    "campaign_groups",
    Base.metadata,
    Column("campaign_id", UUID(as_uuid=True), ForeignKey("campaigns.id")),
    Column("group_id", UUID(as_uuid=True), ForeignKey("groups.id"))
)

class CampaignStatus(str, enum.Enum):
    draft = "draft"
    active = "active"
    completed = "completed"
    paused = "paused"

class CampaignDifficulty(str, enum.Enum):
    easy = "easy"
    medium = "medium"
    advanced = "advanced"

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(CampaignStatus), default=CampaignStatus.draft)
    difficulty = Column(Enum(CampaignDifficulty), default=CampaignDifficulty.easy)
    
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True) # Expiry Date
    
    # Tracking Options
    track_opens = Column(Boolean, default=True)
    track_clicks = Column(Boolean, default=True)
    track_submissions = Column(Boolean, default=False)
    
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Relationships
    smtp_profile_id = Column(UUID(as_uuid=True), ForeignKey("smtp_profiles.id"), nullable=True)
    landing_page_id = Column(UUID(as_uuid=True), ForeignKey("landing_pages.id"), nullable=True)
    email_template_id = Column(UUID(as_uuid=True), ForeignKey("email_templates.id"), nullable=True)

    creator = relationship("User")
    emails = relationship("PhishingEmail", back_populates="campaign")
    target_groups = relationship("Group", secondary=campaign_groups, backref="campaigns")
    
    # We can add relationships to the new models if needed, e.g.
    # smtp_profile = relationship("SMTPProfile")

class PhishingEmail(Base):
    __tablename__ = "phishing_emails"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    campaign_id = Column(UUID(as_uuid=True), ForeignKey("campaigns.id"))
    subject = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    open_count = Column(Integer, default=0)
    click_count = Column(Integer, default=0)
    dummy_credentials = Column(JSON, default=list) # Ensure this is compatible with JSON usage

    campaign = relationship("Campaign", back_populates="emails")
