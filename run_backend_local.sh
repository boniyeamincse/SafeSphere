#!/bin/bash
cd backend
source venv/bin/activate
export DATABASE_URL="sqlite:///./test.db"
export JWT_SECRET="dev-secret-key"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
