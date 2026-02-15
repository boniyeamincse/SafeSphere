# SafeSphere – Feature Matrix & Page Flow

## 📋 Module Overview

| Page / Module | Features | Backend APIs | User Roles | Notes / Interaction Flow |
|:---|:---|:---|:---|:---|
| **Login / Signup** | • Email/password login<br>• JWT authentication<br>• Password reset | `POST /auth/login`<br>`POST /auth/register`<br>`POST /auth/reset-password` | ALL | New users register → JWT stored → redirect to dashboard |
| **Dashboard** (Admin/Trainer) | • Overview of campaigns<br>• Vulnerable users<br>• Training progress charts<br>• Quick actions | `GET /campaigns/`<br>`GET /users/`<br>`GET /training/` | Admin, Trainer | Charts show real-time data; clicking a campaign shows details |
| **User Dashboard** (Member) | • Assigned training modules<br>• Quiz progress<br>• Completed achievements<br>• Campaign participation | `GET /training/assigned`<br>`GET /achievements/`<br>`GET /campaigns/assigned` | Member | Users see their own progress; click module → start lesson → take quiz |
| **Campaign Builder** | • Create campaigns<br>• Add phishing emails<br>• Schedule start/end<br>• Track stats | `POST /campaigns/`<br>`POST /campaigns/{id}/emails`<br>`PUT /campaigns/{id}`<br>`GET /campaigns/{id}/stats` | Admin, Trainer | Click “Create Campaign” → fill form → save as draft → activate |
| **Training Module** | • Display lesson content<br>• Quiz questions<br>• Submit answers<br>• Track completion | `GET /training/{id}`<br>`POST /training/{id}/submit` | Member | User finishes module → submits quiz → score stored → progress updated |
| **Achievements** | • List earned badges<br>• Display award date<br>• Share badge | `GET /achievements/` | ALL | Badges are auto-awarded based on quiz score / campaign completion |
| **Leaderboard** | • Top performers<br>• Weekly security tips<br>• Discussion (Optional) | `GET /leaderboard/`<br>`GET /community/tips/`<br>`POST /community/comments/` | ALL | Leaderboard updates dynamically; tips carousel |
| **Profile Page** | • View & edit user info<br>• View history<br>• View badges | `GET /users/{id}`<br>`PUT /users/{id}` | ALL | Users update profile; profile shows all achievements & progress |
| **Admin Reports** | • Export data (CSV/PDF)<br>• Identify high-risk users<br>• Historical trends | `GET /reports/campaigns/`<br>`GET /reports/training/`<br>`GET /reports/users/` | Admin | Export selected campaign/training → generate CSV/PDF → download |
| **Notifications** | • In-app alerts<br>• Email reminders (Optional) | `GET /notifications/`<br>`POST /notifications/send` | ALL | Admin schedules notifications → sent automatically → user sees badge/alert |
| **Settings** | • Manage roles & permissions<br>• System-wide config<br>• SMTP settings | `GET /settings/`<br>`PUT /settings/` | Admin | Only Admin can change system configuration and access control |

## 🔄 User Interaction Flows

### 🛡️ Admin / Trainer Flow
1. **Login** → Redirect to **Dashboard**
2. **Create Campaign** → Add Emails → Activate → **Track Stats**
3. **Create Training Module** → Assign to Users
4. Monitor via **Analytics / Leaderboard**
5. **Export Reports** for management review

### 👤 Member Flow
1. **Login** → Redirect to **User Dashboard**
2. View **Assigned Campaign** or **Training Module**
3. Open Lesson → **Complete Quiz**
4. Receive Score → Track Progress → **Earn Badges**
5. Check **Leaderboard / Community Tips / Profile**

## 🗺️ Feature Mapping Highlights
- **Campaigns**: Campaign Builder + Dashboard + Reports
- **Training**: User Dashboard + Training Module Page + Achievements
- **Community**: Leaderboard + Tips + Comments
- **Analytics**: Dashboard Charts + Reports Page
- **Notifications**: In-App Alerts + Email
