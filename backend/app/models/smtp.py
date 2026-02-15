import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class SMTPProfile(Base):
    __tablename__ = "smtp_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    host = Column(String, nullable=False)
    port = Column(Integer, nullable=False)
    username = Column(String, nullable=True)
    password = Column(String, nullable=True) # Encrypted in real app
    sender_email = Column(String, nullable=False)
    sender_name = Column(String, nullable=True)
    use_tls = Column(Boolean, default=True)
    use_ssl = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
