# Backend Architecture & API Design

## 🔌 API Endpoints
Based on the Feature Matrix, the following endpoints are defined:

### 🔐 Authentication (`/auth`)
- `POST /auth/login`: Authenticate & get JWT
- `POST /auth/register`: Register new user
- `POST /auth/reset-password`: Reset user password (TODO)

### 📊 Dashboard & Users (`/users`, `/dashboard`)
- `GET /users/`: List all users (Admin)
- `GET /users/{id}`: Get user profile
- `PUT /users/{id}`: Update user profile
- `GET /users/me`: Get current logged-in user

### 🛡️ Campaigns (`/campaigns`)
- `GET /campaigns/`: List all campaigns (Admin)
- `GET /campaigns/assigned`: List campaigns for current user (Member)
- `POST /campaigns/`: Create new campaign
- `PUT /campaigns/{id}`: Update specific campaign
- `POST /campaigns/{id}/emails`: Add phishing email templates
- `GET /campaigns/{id}/stats`: Get campaign statistics

### 🎓 Training & Quizzes (`/training`)
- `GET /training/`: List all modules (Admin)
- `GET /training/assigned`: List assigned modules (Member)
- `GET /training/{id}`: Get specific module content
- `POST /training/{id}/submit`: Submit quiz answers
- `POST /training/`: Create new module (Admin)

### 🏆 Gamification (`/achievements`, `/leaderboard`)
- `GET /achievements/`: List user badges
- `GET /leaderboard/`: Get top users ranking
- `GET /community/tips/`: Get security tips (TODO)
- `POST /community/comments/`: Post comment (TODO)

### 📢 Notifications & Reports
- `GET /notifications/`: Get user notifications (TODO)
- `POST /notifications/send`: Send system alert (TODO)
- `GET /reports/campaigns/`: Export campaign data (TODO)
- `GET /reports/training/`: Export training data (TODO)

### ⚙️ Settings
- `GET /settings/`: Get system config (TODO)
- `PUT /settings/`: Update system config (TODO)

## 🗄️ Database Models (`SQLAlchemy`)
### User
- `id`: UUID
- `email`: String (Unique)
- `password_hash`: String
- `role`: Enum (admin, trainer, member)
- `created_at`: DateTime

### Campaign
- `id`: Integer
- `title`: String
- `status`: Enum (draft, active, completed)
- `start_date`: DateTime
- `end_date`: DateTime

### Training
- `TrainingModule`: Content, video_url, quiz_data
- `UserTraining`: user_id, module_id, score, status (in_progress, completed)
- `Achievement`: user_id, badge_name, awarded_at

## 🔐 Security
- **Authentication**: OAuth2 with Password Flow (Bearer Token)
- **Hashing**: Bcrypt for passwords
- **Authorization**: Role-based access control dependent on user `role` field
