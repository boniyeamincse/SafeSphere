"""
Database seeding script for SafeSphere
Creates default admin user and initial data
"""

import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import async_session_maker, engine, Base
from app.models.users import User, UserRole
from app.models.groups import Group
from app.utils.security import get_password_hash

async def create_default_admin():
    """Create default admin user with credentials admin/admin"""
    async with async_session_maker() as db:
        # Check if admin user already exists
        result = await db.execute(select(User).where(User.email == "admin@safesphere.local"))
        existing_admin = result.scalars().first()
        
        if existing_admin:
            print("✓ Default admin user already exists")
            return existing_admin
        
        # Create default admin user
        admin_user = User(
            name="Administrator",
            email="admin@safesphere.local",
            password_hash=get_password_hash("admin"),
            role=UserRole.admin,
            group_id=None
        )
        
        db.add(admin_user)
        await db.commit()
        await db.refresh(admin_user)
        
        print("✓ Created default admin user")
        print(f"  Email: admin@safesphere.local")
        print(f"  Password: admin")
        print(f"  Role: {admin_user.role}")
        
        return admin_user

async def create_default_groups():
    """Create default user groups"""
    async with async_session_maker() as db:
        default_groups = [
            {"name": "IT Department", "description": "Information Technology staff"},
            {"name": "Human Resources", "description": "HR team members"},
            {"name": "Sales", "description": "Sales department"},
            {"name": "Management", "description": "Management and executives"},
        ]
        
        created_count = 0
        for group_data in default_groups:
            result = await db.execute(select(Group).where(Group.name == group_data["name"]))
            existing_group = result.scalars().first()
            
            if not existing_group:
                group = Group(**group_data)
                db.add(group)
                created_count += 1
        
        await db.commit()
        print(f"✓ Created {created_count} default groups")

async def seed_database():
    """Main seeding function"""
    print("\n" + "="*50)
    print("SafeSphere Database Seeding")
    print("="*50 + "\n")
    
    # Create tables if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✓ Database tables verified\n")
    
    # Create default data
    await create_default_admin()
    await create_default_groups()
    
    print("\n" + "="*50)
    print("Database seeding completed!")
    print("="*50)
    print("\nDefault Admin Credentials:")
    print("  Email: admin@safesphere.local")
    print("  Password: admin")
    print("\n⚠️  IMPORTANT: Change the default password after first login!\n")

if __name__ == "__main__":
    asyncio.run(seed_database())
