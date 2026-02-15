import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSON
from app.database import Base

class EmailTemplate(Base):
    __tablename__ = "email_templates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    body = Column(Text, nullable=False) # HTML content
    variables = Column(JSON, default=list) # e.g. ["FirstName", "CompanyName"]
    created_at = Column(DateTime, default=datetime.utcnow)

class LandingPage(Base):
    __tablename__ = "landing_pages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    html_content = Column(Text, nullable=False)
    capture_credentials = Column(String, nullable=True)  # 'password' or 'mfa' or null
    created_at = Column(DateTime, default=datetime.utcnow)
