# Frontend Architecture

## 📂 Structure
- **`src/pages`**: Top-level route components.
- **`src/components`**: Reusable UI elements (Sidebar, StatCards).
- **`src/assets`**: Static images (Illustrations, Logos).

## 🧭 Routing (`App.jsx`)
| Path | Component | Description |
|------|-----------|-------------|
| `/login` | `Login.jsx` | User authentication entry |
| `/signup` | `Signup.jsx` | New user registration |
| `/dashboard` | `Dashboard.jsx` | Admin overview with charts |
| `/user-dashboard` | `UserDashboard.jsx` | User progress & gamification |
| `/campaign-builder` | `CampaignBuilder.jsx` | Phishing simulation creator |
| `/training` | `TrainingModule.jsx` | Education content viewer |
| `/achievements` | `Achievements.jsx` | Badge showcase |
| `/leaderboard` | `Leaderboard.jsx` | User rankings |
| `/profile` | `Profile.jsx` | User settings |

## 🧩 Key Components
- **`Layout.jsx`**: Wraps protected routes, provides `Sidebar` navigation.
- **`Sidebar`**: Responsive navigation menu with active state styling.
- **`StatCard`**: Dashboard widget for exhibiting metrics.

## 🎨 Styling Strategy
- **TailwindCSS v4**: Utility-first styling.
- **Framer Motion**: Page transitions and micro-interactions.
- **Lucide React**: Vector icons.
