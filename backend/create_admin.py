#!/usr/bin/env python3
"""
Simple script to create default admin user
Run this after the database is set up
"""

import sys
import os
from passlib.context import CryptContext

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_password_hash(password: str) -> str:
    """Generate bcrypt password hash"""
    return pwd_context.hash(password)

def create_admin_sql():
    """Generate SQL for creating admin user"""
    password_hash = generate_password_hash("admin")
    
    sql = f"""
-- SafeSphere Default Admin User
INSERT INTO users (id, name, email, password_hash, role, created_at, group_id)
VALUES (
    gen_random_uuid(),
    'Administrator',
    'admin@safesphere.local',
    '{password_hash}',
    'admin',
    NOW(),
    NULL
)
ON CONFLICT (email) DO NOTHING;
"""
    return sql

if __name__ == "__main__":
    print("\n" + "="*60)
    print("SafeSphere - Default Admin User Setup")
    print("="*60)
    
    print("\nGenerating password hash for 'admin'...")
    sql = create_admin_sql()
    
    print("\n" + "-"*60)
    print("Copy and paste this SQL into your PostgreSQL client:")
    print("-"*60)
    print(sql)
    print("-"*60)
    
    print("\nDefault Admin Credentials:")
    print("  Email: admin@safesphere.local")
    print("  Password: admin")
    print("\n⚠️  IMPORTANT: Change the password after first login!")
    print("\n" + "="*60 + "\n")
