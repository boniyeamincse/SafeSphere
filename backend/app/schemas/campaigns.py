from typing import Optional, List
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from enum import Enum

class CampaignStatus(str, Enum):
    draft = "draft"
    active = "active"
    completed = "completed"

class PhishingEmailBase(BaseModel):
    subject: str
    body: str

class PhishingEmailCreate(PhishingEmailBase):
    pass

class PhishingEmailResponse(PhishingEmailBase):
    id: UUID
    campaign_id: UUID
    open_count: int
    click_count: int
    class Config:
        from_attributes = True

class CampaignDifficulty(str, Enum):
    easy = "easy"
    medium = "medium"
    advanced = "advanced"

class CampaignBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    status: CampaignStatus = CampaignStatus.draft
    difficulty: CampaignDifficulty = CampaignDifficulty.easy
    
    # Tracking
    track_opens: bool = True
    track_clicks: bool = True
    track_submissions: bool = False

class CampaignCreate(CampaignBase):
    smtp_profile_id: Optional[UUID] = None
    landing_page_id: Optional[UUID] = None
    email_template_id: Optional[UUID] = None
    target_group_ids: List[UUID] = []

class CampaignResponse(CampaignBase):
    id: UUID
    created_by: UUID
    smtp_profile_id: Optional[UUID] = None
    landing_page_id: Optional[UUID] = None
    email_template_id: Optional[UUID] = None
    emails: List[PhishingEmailResponse] = []
    
    # We could include full objects here if needed, e.g.
    # smtp_profile: Optional[SMTPProfileResponse]
    
    class Config:
        from_attributes = True
