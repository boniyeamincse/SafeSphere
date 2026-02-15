from typing import Optional, List, Dict
from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

# SMTP Profile Schemas
class SMTPProfileBase(BaseModel):
    name: str
    host: str
    port: int
    username: Optional[str] = None
    sender_email: EmailStr
    sender_name: Optional[str] = None
    use_tls: bool = True
    use_ssl: bool = False

class SMTPProfileCreate(SMTPProfileBase):
    password: Optional[str] = None

class SMTPProfileResponse(SMTPProfileBase):
    id: UUID
    created_at: datetime
    class Config:
        from_attributes = True

# Email Template Schemas
class EmailTemplateBase(BaseModel):
    name: str
    subject: str
    body: str
    variables: List[str] = []

class EmailTemplateCreate(EmailTemplateBase):
    pass

class EmailTemplateResponse(EmailTemplateBase):
    id: UUID
    created_at: datetime
    class Config:
        from_attributes = True

# Landing Page Schemas
class LandingPageBase(BaseModel):
    name: str
    html_content: str
    redirect_url: Optional[str] = None
    capture_credentials: bool = False
    mfa_enabled: bool = False

class LandingPageCreate(LandingPageBase):
    pass

class LandingPageResponse(LandingPageBase):
    id: UUID
    created_at: datetime
    class Config:
        from_attributes = True
