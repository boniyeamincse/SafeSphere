# SafeSphere 🛡️

A comprehensive **Security Awareness Training Platform** designed to help organizations protect against phishing attacks through realistic simulations and interactive training modules.

![SafeSphere Banner](https://img.shields.io/badge/Security-Awareness-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Version](https://img.shields.io/badge/version-1.0.0-orange)

## ✨ Features

### 🎯 Campaign Management
- **Multi-Step Campaign Builder**: Create phishing simulations with a guided 5-step wizard
- **Difficulty Levels**: Easy, Medium, and Advanced campaign configurations
- **Real-Time Tracking**: Monitor email opens, link clicks, and credential submissions
- **Risk Score Analytics**: Automated risk assessment based on user interactions
- **Campaign Scheduling**: Schedule campaigns for immediate or future deployment
- **SMTP Integration**: Multiple SMTP profile support for email delivery

### 👥 User & Group Management
- **Role-Based Access Control**: Admin, Trainer, and Member roles
- **Group Organization**: Organize users into departments or teams
- **Bulk User Operations**: Import and manage users at scale
- **Group Targeting**: Target specific groups for phishing campaigns

### 📧 Email & Landing Pages
- **Template Library**: Pre-built and customizable email templates
- **Dynamic Variables**: Personalize emails with {{FirstName}}, {{Department}}, etc.
- **Landing Page Designer**: Create realistic phishing landing pages
- **Credential Capture**: Simulate credential theft scenarios
- **MFA Simulation**: Test multi-factor authentication awareness

### 📊 Analytics & Reporting
- **Dashboard Overview**: Real-time statistics and metrics
- **Campaign Performance**: Track sent, clicked, and submitted rates
- **User Progress Tracking**: Monitor individual learning paths
- **Risk Trends**: Visualize security posture over time

### 🎓 Training & Gamification
- **Interactive Training Modules**: Engaging security awareness content
- **Achievement System**: Badges and rewards for user engagement
- **Leaderboard**: Competitive learning environment
- **Progress Tracking**: Personalized learning dashboards

### 🎨 Modern UI/UX
- **"AntiGravity" Design System**: Dark theme with glassmorphism effects
- **Responsive Layout**: Mobile-friendly interface
- **Smooth Animations**: Framer Motion powered transitions
- **Brand Colors**: Teal and blue gradient color scheme

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.9+
- **PostgreSQL** 13+
- **Docker** (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/boniyeamincse/SafeSphere.git
   cd SafeSphere
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb safesphere
   
   # Update backend/.env with your database credentials
   DATABASE_URL=postgresql://user:password@localhost/safesphere
   ```

5. **Run the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

- [**Installation Guide**](./docs/INSTALLATION.md) - Detailed installation instructions
- [**User Guide**](./docs/USER_GUIDE.md) - How to use SafeSphere
- [**API Reference**](./docs/API.md) - Backend API documentation
- [**Development Guide**](./docs/DEVELOPMENT.md) - Development setup and guidelines
- [**Deployment Guide**](./docs/DEPLOYMENT.md) - Production deployment instructions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details on:
- Code of Conduct
- Development workflow
- Coding standards
- Pull request process

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

## 👨‍💻 Author

**Brainless (Boni Yeamin)**
- GitHub: [@boniyeamincse](https://github.com/boniyeamincse)
- Email: boniyeamin@brainless.dev

## 🙏 Acknowledgments

- Built with ❤️ using React, FastAPI, and PostgreSQL
- Design inspired by modern security platforms
- Special thanks to the open-source community

## 📞 Support

For support, questions, or feedback:
- Open an issue on [GitHub Issues](https://github.com/boniyeamincse/SafeSphere/issues)
- Email: support@safesphere.dev

---

**SafeSphere** - Empowering organizations to build a human firewall against cyber threats 🛡️
