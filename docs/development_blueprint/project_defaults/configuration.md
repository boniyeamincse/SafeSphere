# Project Defaults & Configuration

## 🛠 Tech Stack
- **Core Strategy**: "AntiGravity" Design (Modern, Dark, Animation-rich)
- **Frontend**: React 18, Vite, TailwindCSS v4
- **Backend**: FastAPI, SQLAlchemy (Async), Pydantic
- **Database**: PostgreSQL (Production), SQLite (Local Dev)
- **Containerization**: Docker, Docker Compose

## ⚙️ Environment Variables
### Backend (`.env` or `config.py`)
- `DATABASE_URL`: Connection string for PostgreSQL/SQLite
- `JWT_SECRET`: Secret key for token generation
- `ACCESS_TOKEN_EXPIRE_MINUTES`: JWT validity duration (default: 30)

### Frontend
- `VITE_API_URL`: Base URL for backend API (default: `http://localhost:8000`)

## 🎨 Design System
- **Colors**:
  - Primary: `#0B3D91` (Deep Blue)
  - Accent: `#00BFA6` (Teal)
  - Background: `#111827` (Gray-900)
- **Typography**: Inter / Sans-serif
- **Icons**: Lucide-React
