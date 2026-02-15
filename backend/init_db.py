#!/usr/bin/env python3
"""
Initialize database with tables and default admin user
"""

import asyncio
from app.database import Base, engine
# Import ALL models to register them with SQLAlchemy
from app.models.users import User, UserRole
from app.models.groups import Group
from app.models.campaigns import Campaign
from app.models.smtp import SMTPProfile
from app.models.templates import EmailTemplate, LandingPage
from app.utils.security import get_password_hash
from sqlalchemy import select
from app.database import SessionLocal

async def init_database():
    print("="*60)
    print("SafeSphere Database Initialization")
    print("="*60)
    print()
    
    # Create all tables (only creates missing ones)
    print("Step 1: Creating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✓ Tables created successfully")
    print()
    
    # Create admin user
    print("Step 2: Creating default admin user...")
    async with SessionLocal() as db:
        admin = User(
            name='Administrator',
            email='admin@safesphere.local',
            password_hash=get_password_hash('admin'),
            role=UserRole.admin
        )
        
        db.add(admin)
        await db.commit()
        await db.refresh(admin)
        
        print("✓ Admin user created successfully")
        print(f"   Email: admin@safesphere.local")
        print(f"   Password: admin")
        print(f"   Role: {admin.role}")
    
    print()
    print("="*60)
    print("Database initialization complete!")
    print("="*60)
    print()
    print("⚠️  IMPORTANT: Change the admin password after first login!")
    print()

if __name__ == "__main__":
    asyncio.run(init_database())
