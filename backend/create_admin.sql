-- SafeSphere Default Admin User Creation
-- This script creates a default admin account with credentials:
-- Email: admin@safesphere.local
-- Password: admin
-- 
-- ⚠️ IMPORTANT: Change the password after first login!

-- Check if admin user exists and create if not
INSERT INTO users (id, name, email, password_hash, role, created_at, group_id)
VALUES (
    gen_random_uuid(),
    'Administrator',
    'admin@safesphere.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYlb4tXza',  -- bcrypt hash of 'admin'
    'admin',
    NOW(),
    NULL
)
ON CONFLICT (email) DO UPDATE
SET password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYlb4tXza',
    role = 'admin';

-- Verify the admin user was created
SELECT id, name, email, role, created_at 
FROM users 
WHERE email = 'admin@safesphere.local';
