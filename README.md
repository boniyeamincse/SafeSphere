# SafeSphere
[![GitHub](https://img.shields.io/badge/github-view-blue.svg)](https://github.com/boniyeamincse/SafeSphere)
[![Documentation](https://img.shields.io/badge/docs-view-green.svg)](https://github.com/boniyeamincse/SafeSphere/tree/main/documentation)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)](https://github.com/boniyeamincse/SafeSphere/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

SafeSphere is a free and open source security awareness training platform designed to protect organizations against phishing attacks through realistic simulations and interactive training modules. It is capable of educating employees across all departments and organizational levels on cybersecurity best practices.

The SafeSphere solution consists of a campaign management system that creates and deploys phishing simulations, a training module system that delivers interactive security awareness content, and an analytics dashboard that tracks user behavior and organizational security posture. SafeSphere provides comprehensive insights through detailed metrics, risk scoring, and progress tracking.

![Homepage](images/homepage.png)

## SafeSphere capabilities
A brief presentation of some of the more common use cases of the SafeSphere platform.

### Phishing simulation
SafeSphere creates realistic phishing campaigns to test employee awareness and response to social engineering attacks. The platform supports customizable email templates, dynamic variables for personalization, and landing pages that simulate credential theft scenarios.

Campaigns can be configured with varying difficulty levels (easy, medium, advanced) and tracking options to monitor email opens, link clicks, and credential submissions. The multi-step campaign builder guides administrators through target selection, content configuration, SMTP setup, and scheduling.

### Security awareness training
SafeSphere delivers interactive training modules covering essential cybersecurity topics including phishing recognition, password security, social engineering, and data protection. Training content is designed to be engaging and accessible to users of all technical backgrounds.

The platform tracks individual progress through training modules, provides quiz-based assessments, and generates completion certificates. Administrators can assign specific training paths to different user groups based on their roles and risk profiles.

### User behavior analytics
SafeSphere collects and analyzes user interaction data from phishing campaigns and training modules to assess organizational security posture. The platform generates risk scores for individual users and departments based on their performance in simulations.

Analytics dashboards provide real-time visibility into campaign statistics, training completion rates, and security trends over time. Reports can be filtered by department, user group, campaign type, or time period to identify areas requiring additional focus.

### Gamification and engagement
SafeSphere incorporates gamification elements to encourage active participation in security awareness programs. Users earn achievements and badges for completing training modules, identifying phishing attempts, and maintaining consistent engagement.

A leaderboard system creates friendly competition among users and departments, driving higher completion rates and better retention of security concepts. Progress tracking and personalized dashboards help users visualize their security awareness journey.

### Group and role management
SafeSphere provides comprehensive user and group management capabilities with role-based access control. Administrators can organize users into departments or teams, assign specific roles (Admin, Trainer, Member), and manage permissions granularly.

Group-based campaign targeting allows administrators to tailor phishing simulations to specific departments or job functions. Bulk user operations streamline the process of adding, updating, or removing multiple users simultaneously.

### Email template and landing page management
SafeSphere includes a library of pre-built email templates and landing pages that simulate common phishing scenarios. Templates support dynamic variables ({{FirstName}}, {{Department}}, etc.) for personalization at scale.

Administrators can customize existing templates or create new ones to match specific organizational contexts or emerging threat patterns. Landing pages can simulate various credential capture scenarios including login forms, password resets, and multi-factor authentication prompts.

### SMTP integration and delivery
SafeSphere supports multiple SMTP profiles for flexible email delivery across different sending domains and IP addresses. SMTP profiles can be configured with authentication, encryption, and rate limiting to ensure reliable delivery.

Campaign scheduling allows administrators to deploy simulations immediately or schedule them for future dates. The platform tracks delivery status and provides detailed logs for troubleshooting delivery issues.

### Real-time campaign monitoring
SafeSphere provides real-time monitoring of active campaigns with live statistics on email delivery, opens, clicks, and credential submissions. Administrators can view detailed user-level data to identify high-risk individuals requiring additional training.

Campaign results are visualized through charts and graphs showing click rates, submission rates, and risk score distributions. Comparative analytics help measure improvement in security awareness over time.

## WUI
The SafeSphere web user interface provides a powerful dashboard for campaign management, training delivery, and analytics visualization. The interface features a modern "AntiGravity" design system with glassmorphism effects and smooth animations.

![Homepage](images/homepage.png)
![Login](images/login.png)

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/14b8a6/ffffff?text=Dashboard+Overview)

### Campaign Management
![Campaign Management](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Campaign+Management)

### Training Modules
![Training](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Training+Modules)

### Analytics
![Analytics](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Analytics+Dashboard)

### User Management
![Users](https://via.placeholder.com/800x400/10b981/ffffff?text=User+Management)

## Deployment Options
Here you can find all the deployment methods available for SafeSphere.

* **[Manual Installation](./documentation/admin-guide/installation.html)** - Traditional installation on Linux/Windows/macOS
* **[Docker Containers](./docker-compose.yml)** - Containerized deployment with Docker Compose
* **Local Development** - Development setup with hot-reload capabilities

## Branches
* `main` branch contains the latest stable code, suitable for production deployments.

## Technology Stack

### Frontend
| Technology | Version | Author | License |
|------------|---------|--------|---------|
| React | 18.2.0 | Meta (Facebook) | MIT License |
| Vite | 5.0.0 | Evan You | MIT License |
| Tailwind CSS | 3.4.0 | Adam Wathan | MIT License |
| Framer Motion | 11.0.0 | Framer | MIT License |
| React Router | 6.20.0 | Remix Software | MIT License |
| Axios | 1.6.0 | Matt Zabriskie | MIT License |
| Recharts | 2.10.0 | Recharts | MIT License |
| Lucide React | 0.300.0 | Lucide | ISC License |

### Backend
| Technology | Version | Author | License |
|------------|---------|--------|---------|
| FastAPI | 0.109.0 | Sebastián Ramírez | MIT License |
| Python | 3.9+ | Python Software Foundation | PSF License |
| SQLAlchemy | 2.0.0 | Mike Bayer | MIT License |
| Pydantic | 2.5.0 | Samuel Colvin | MIT License |
| Uvicorn | 0.27.0 | Encode | BSD License |
| PostgreSQL | 13+ | PostgreSQL Global Development Group | PostgreSQL License |
| PyJWT | 2.8.0 | José Padilla | MIT License |
| Passlib | 1.7.4 | Eli Collins | BSD License |

## Documentation
* [Full documentation](./documentation/index.html)
* [User Guide](./documentation/user-guide/getting-started.html)
* [Installation Guide](./documentation/admin-guide/installation.html)
* [API Reference](./documentation/dev-guide/api-reference.html)
* [Development Setup](./documentation/dev-guide/development-setup.html)

## Get involved
Become part of the SafeSphere community to learn from other users, participate in discussions, talk to the developers and contribute to the project.

If you want to contribute to our project please don't hesitate to make pull-requests, submit issues or send commits, we will review all your questions.

You can also reach out through our GitHub repository at [SafeSphere Issues](https://github.com/boniyeamincse/SafeSphere/issues) to ask questions and participate in discussions.

Stay up to date on news, releases, and engineering articles.

* [GitHub Repository](https://github.com/boniyeamincse/SafeSphere)
* [Documentation Website](./documentation/index.html)
* [Issue Tracker](https://github.com/boniyeamincse/SafeSphere/issues)
* [Contributing Guidelines](./CONTRIBUTING.md)

## Authors
SafeSphere Copyright (C) 2026 Brainless (Boni Yeamin) (License MIT)

Built with ❤️ to empower organizations in building a human firewall against cyber threats.
