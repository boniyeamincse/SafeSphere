# detailed Development Plan (Dev -> Test -> Upload)

This plan outlines the lifecycle for each module based on the Feature Matrix.

## 🟢 Phase 1: Authentication & Core (Completed)
| Feature | Dev Status | Test Status | Upload Status |
|:---|:---:|:---:|:---:|
| **Login / Signup UI** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **JWT Backend** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **Password Reset** | ⏳ Pending | ⬜ | ⬜ |

## 🔵 Phase 2: Dashboards & Training (In Progress)
| Feature | Dev Status | Test Status | Upload Status |
|:---|:---:|:---:|:---:|
| **Admin Dashboard UI** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **User Dashboard UI** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **Training Module UI** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **Training Backend API** | ✅ Done | ⬜ Unverified | ✅ Uploaded |
| **Quiz Logic** | 🚧 Partial | ⬜ | ⬜ |

## 🟣 Phase 3: Campaigns & Gamification (In Progress)
| Feature | Dev Status | Test Status | Upload Status |
|:---|:---:|:---:|:---:|
| **Campaign Builder UI** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **Campaign Backend** | ✅ Done | ⬜ Unverified | ✅ Uploaded |
| **Achievements UI** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **Leaderboard UI** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **Gamification Logic** | ⏳ Pending | ⬜ | ⬜ |

## 🟠 Phase 4: Advanced Features (Planned)
| Feature | Dev Status | Test Status | Upload Status |
|:---|:---:|:---:|:---:|
| **Profile Page** | ✅ Done | ✅ Verified | ✅ Uploaded |
| **Admin Reports** | ⏳ Pending | ⬜ | ⬜ |
| **Notifications System** | ⏳ Pending | ⬜ | ⬜ |
| **System Settings** | ⏳ Pending | ⬜ | ⬜ |
| **Community/Tips** | ⏳ Pending | ⬜ | ⬜ |

## 🛠️ Workflow Standard
1. **Dev**: Implement feature in local environment (`localhost`).
2. **Test**: 
   - Verify UI responsiveness.
   - Test API integration (using Swagger/Postman).
   - Check Docker container stability.
3. **Upload**: 
   - Commit to Git: `git commit -m "Feat: <Name>"`
   - Push to GitHub: `git push origin main`
