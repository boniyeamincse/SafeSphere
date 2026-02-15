from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from uuid import UUID
from app.database import get_db
from app.models.campaigns import Campaign, PhishingEmail
from app.schemas.campaigns import CampaignCreate, CampaignResponse, PhishingEmailCreate, PhishingEmailResponse

router = APIRouter()

@router.post("/", response_model=CampaignResponse)
async def create_campaign(campaign: CampaignCreate, db: AsyncSession = Depends(get_db)):
    # Mock created_by for MVP
    # In real app, get from current_user
    new_campaign = Campaign(**campaign.dict()) 
    db.add(new_campaign)
    await db.commit()
    await db.refresh(new_campaign)
    return new_campaign

@router.get("/", response_model=List[CampaignResponse])
async def read_campaigns(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Campaign).options(selectinload(Campaign.emails)).offset(skip).limit(limit))
    campaigns = result.scalars().all()
    return campaigns

@router.get("/{campaign_id}", response_model=CampaignResponse)
async def read_campaign(campaign_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Campaign).options(selectinload(Campaign.emails)).where(Campaign.id == campaign_id))
    campaign = result.scalars().first()
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.post("/{campaign_id}/emails", response_model=PhishingEmailResponse)
async def add_email_to_campaign(campaign_id: UUID, email: PhishingEmailCreate, db: AsyncSession = Depends(get_db)):
    new_email = PhishingEmail(**email.dict(), campaign_id=campaign_id)
    db.add(new_email)
    await db.commit()
    await db.refresh(new_email)
    return new_email
