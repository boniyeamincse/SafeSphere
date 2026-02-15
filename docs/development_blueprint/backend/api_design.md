# Backend Architecture

## 🔌 API Structure (`FastAPI`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Authenticate & get JWT |
| `GET` | `/users/me` | Get current user's profile |
| `POST` | `/campaigns/` | Create new campaign |
| `POST` | `/training/` | Create training module |

## 🗄️ Database Models (`SQLAlchemy`)
### User
- `id`: UUID
- `email`: String (Unique)
- `password_hash`: String
- `role`: Enum (admin, user, trainer)

### Campaign
- `id`: Integer
- `title`: String
- `status`: Enum (draft, active, completed)
- `phishing_emails`: Relationship to Email Templates

### Training
- `TrainingModule`: Content and Quizzes
- `UserTraining`: Progress tracking (status, score)
- `Achievement`: Badges unlocked by users

## 🔐 Security
- **Authentication**: OAuth2 with Password Flow (Bearer Token)
- **Hashing**: Bcrypt for passwords
- **Authorization**: Role-based access control dependent on user `role` field
