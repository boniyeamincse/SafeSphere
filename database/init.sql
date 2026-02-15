-- Init SQL for SafeSphere

-- UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'member', -- admin, trainer, member
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_by UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'draft' -- draft, active, completed
);

-- Phishing Emails Table
CREATE TABLE IF NOT EXISTS phishing_emails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id),
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    open_count INT DEFAULT 0,
    click_count INT DEFAULT 0,
    dummy_credentials JSONB DEFAULT '[]'::jsonb
);

-- Training Modules Table
CREATE TABLE IF NOT EXISTS training_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    quiz JSONB DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES users(id)
);

-- User Training Progress Table
CREATE TABLE IF NOT EXISTS user_training (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    module_id UUID REFERENCES training_modules(id),
    progress INT DEFAULT 0,
    quiz_score INT DEFAULT 0,
    completed_at TIMESTAMP
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    badge_name VARCHAR(255) NOT NULL,
    awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
