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

class CampaignBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    status: CampaignStatus = CampaignStatus.draft

class CampaignCreate(CampaignBase):
    pass

class CampaignResponse(CampaignBase):
    id: UUID
    created_by: UUID
    emails: List[PhishingEmailResponse] = []
    class Config:
        from_attributes = True
