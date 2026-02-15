from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from uuid import UUID
from app.database import get_db
from app.models.campaigns import Campaign, PhishingEmail
from app.models.training import Achievement
from app.models.users import User
from app.schemas.campaigns import CampaignCreate, CampaignResponse, PhishingEmailCreate, PhishingEmailResponse
from app.utils.security import get_current_user

router = APIRouter()

@router.post("/", response_model=CampaignResponse)
async def create_campaign(
    campaign: CampaignCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Create Campaign
    new_campaign = Campaign(**campaign.dict())
    new_campaign.created_by = current_user.id
    db.add(new_campaign)
    await db.commit()
    await db.refresh(new_campaign)
    
    # Gamification: Award "Campaign Creator" badge if first campaign
    result = await db.execute(select(Campaign).where(Campaign.created_by == current_user.id))
    campaign_count = len(result.scalars().all())
    
    if campaign_count == 1:
        badge_name = "Campaign Creator"
        # Check if badge exists (idempotency)
        result = await db.execute(select(Achievement).where(
            Achievement.user_id == current_user.id,
            Achievement.badge_name == badge_name
        ))
        if not result.scalars().first():
            new_badge = Achievement(user_id=current_user.id, badge_name=badge_name)
            db.add(new_badge)
            await db.commit()

    # Reload with relationships to avoid MissingGreenlet error
    result = await db.execute(select(Campaign).options(selectinload(Campaign.emails)).where(Campaign.id == new_campaign.id))
    new_campaign = result.scalars().first()
    
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
