from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from typing import List
from uuid import UUID

from app.database import get_db
from app.models.smtp import SMTPProfile as SMTPModel
from app.models.templates import EmailTemplate as TemplateModel
from app.models.templates import LandingPage as PageModel
from app.schemas.campaign_assets import (
    SMTPProfileCreate, SMTPProfileResponse,
    EmailTemplateCreate, EmailTemplateResponse,
    LandingPageCreate, LandingPageResponse
)

router = APIRouter()

# --- SMTP Profiles ---
@router.post("/smtp-profiles/", response_model=SMTPProfileResponse)
async def create_smtp_profile(profile: SMTPProfileCreate, db: Session = Depends(get_db)):
    db_profile = SMTPModel(**profile.model_dump())
    db.add(db_profile)
    await db.commit()
    await db.refresh(db_profile)
    return db_profile

@router.get("/smtp-profiles/", response_model=List[SMTPProfileResponse])
async def read_smtp_profiles(db: Session = Depends(get_db)):
    result = await db.execute(select(SMTPModel))
    return result.scalars().all()

# --- Email Templates ---
@router.post("/email-templates/", response_model=EmailTemplateResponse)
async def create_email_template(template: EmailTemplateCreate, db: Session = Depends(get_db)):
    db_template = TemplateModel(**template.model_dump())
    db.add(db_template)
    await db.commit()
    await db.refresh(db_template)
    return db_template

@router.get("/email-templates/", response_model=List[EmailTemplateResponse])
async def read_email_templates(db: Session = Depends(get_db)):
    result = await db.execute(select(TemplateModel))
    return result.scalars().all()

# --- Landing Pages ---
@router.post("/landing-pages/", response_model=LandingPageResponse)
async def create_landing_page(page: LandingPageCreate, db: Session = Depends(get_db)):
    db_page = PageModel(**page.model_dump())
    db.add(db_page)
    await db.commit()
    await db.refresh(db_page)
    return db_page

@router.get("/landing-pages/", response_model=List[LandingPageResponse])
async def read_landing_pages(db: Session = Depends(get_db)):
    result = await db.execute(select(PageModel))
    return result.scalars().all()
