# Contributing to SafeSphere 🤝

Thank you for your interest in contributing to SafeSphere! This document provides comprehensive guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Roles](#development-roles)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Issue Reporting](#issue-reporting)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Community](#community)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors. We expect:

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Collaborative**: Work together and help each other
- **Be Professional**: Keep discussions focused and constructive
- **Be Inclusive**: Welcome contributors of all backgrounds and skill levels

---

## How Can I Contribute?

There are many ways to contribute to SafeSphere:

### 🐛 Reporting Bugs
Help us identify and fix bugs by reporting issues you encounter.

### 💡 Suggesting Enhancements
Suggest new features or improvements to existing functionality.

### 📝 Documentation
Improve documentation, write tutorials, or create examples.

### 🎨 Design & UI/UX
Contribute UI/UX improvements, icons, or visual assets.

### 💻 Code Contributions
Fix bugs, implement features, or improve performance.

### 🧪 Testing & QA
Write tests, perform manual testing, or validate new features.

### 🌐 Translations
Help translate SafeSphere into other languages.

### 📢 Community Support
Answer questions, help other users, or spread the word.

---

## Development Roles

We welcome contributors in various capacities:

### 🔧 Core Developers
- **Responsibilities**: Implement features, fix bugs, review PRs, maintain code quality
- **Skills Needed**: Python (FastAPI), JavaScript (React), SQL, Git
- **Time Commitment**: Varies (from occasional to regular contributions)

### 📚 Documentation Writers
- **Responsibilities**: Write user guides, create tutorials, improve API docs, translate content
- **Skills Needed**: Technical writing, markdown, understanding of the platform
- **Time Commitment**: Flexible

### 🎨 UI/UX Designers
- **Responsibilities**: Create mockups, design icons/assets, improve user experience, create brand materials
- **Skills Needed**: Figma/Sketch, CSS/Tailwind, design principles
- **Time Commitment**: Project-based

### 🧪 Quality Assurance Engineers
- **Responsibilities**: Write test cases, perform manual testing, report bugs, verify fixes
- **Skills Needed**: Testing methodologies, attention to detail, documentation
- **Time Commitment**: Flexible

### 🌐 Community Managers
- **Responsibilities**: Answer questions, triage issues, welcome new contributors, organize events
- **Skills Needed**: Communication, patience, community building
- **Time Commitment**: Regular engagement

### 🔒 Security Researchers
- **Responsibilities**: Identify vulnerabilities, suggest security improvements, review security practices
- **Skills Needed**: Security knowledge, ethical hacking, responsible disclosure
- **Time Commitment**: Occasional

---

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **PostgreSQL** (v14 or higher)
- **Git** for version control
- A **GitHub account**

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/SafeSphere.git
   cd SafeSphere
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/boniyeamincse/SafeSphere.git
   ```

### Setup Development Environment

**Database Setup**:
```bash
# Run automated setup script
chmod +x setup_database.sh
./setup_database.sh
```

**Backend Setup**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Initialize database (if not done by setup script)
python init_db.py
```

**Frontend Setup**:
```bash
cd frontend
npm install
```

**Start Development Servers**:
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Access the Application**:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions**:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or changes
- `style/` - UI/styling changes

### 2. Make Your Changes

- Write clean, readable code
- Follow the [coding standards](#coding-standards)
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# Linting
cd backend
flake8 app/
black app/ --check

cd frontend
npm run lint
```

### 4. Commit Your Changes

Follow **Conventional Commits** specification:

```bash
git add .
git commit -m "feat: add email template preview feature

- Add preview endpoint in templates router
- Create preview component in frontend
- Add unit tests for preview functionality
- Update documentation"
```

**Commit types**:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with a clear description.

---

## Issue Reporting

### 🐛 Bug Reports

When reporting a bug, use this template:

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Ubuntu 22.04]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., v18.17.0]
- Python: [e.g., 3.11.0]

**Additional Context**
Any other relevant information.
```

### 💡 Feature Requests

When requesting a feature, include:

- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives Considered**: Other approaches
- **Use Cases**: Real-world scenarios
- **Priority**: Low / Medium / High

### 🔒 Security Issues

**⚠️ DO NOT open public issues for security vulnerabilities!**

Instead, please email security concerns to: **boniyeamincse@gmail.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commits are clean and well-described
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Changes Made
- Added X feature
- Fixed Y bug
- Updated Z documentation

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots of UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and linters
2. **Code Review**: Maintainers review your code
3. **Feedback**: You may be asked to make changes
4. **Approval**: Once approved, PR will be merged
5. **Celebration**: You're now a SafeSphere contributor! 🎉

---

## Coding Standards

### Python (Backend)

- Follow **PEP 8** style guide
- Use **type hints** for function parameters and return values
- Write **docstrings** for all public functions and classes
- Keep functions **small and focused**
- Use **async/await** for database operations

**Example:**
```python
async def create_campaign(
    campaign: CampaignCreate,
    db: AsyncSession,
    current_user: User
) -> Campaign:
    """
    Create a new phishing campaign.
    
    Args:
        campaign: Campaign creation schema
        db: Database session
        current_user: Authenticated user
        
    Returns:
        Created campaign object
    """
    # Implementation
```

**Tools**:
```bash
# Format code
black app/ --line-length 100

# Linting
flake8 app/ --max-line-length 100
```

### JavaScript/React (Frontend)

- Use **functional components** with hooks
- Follow **ESLint** rules
- Use **descriptive variable names**
- Keep components **small and reusable**
- Use **PropTypes** for type checking

**Example:**
```javascript
const CampaignCard = ({ campaign, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(campaign.id);
    };
    
    return (
        <div className="campaign-card">
            {/* Component implementation */}
        </div>
    );
};

CampaignCard.propTypes = {
    campaign: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
```

**Tools**:
```bash
# Linting
npm run lint

# Auto-fix
npm run lint:fix
```

---

## Testing

### Backend Tests

```bash
cd backend
source venv/bin/activate

# Run all tests
pytest

# Run specific test file
pytest tests/test_auth.py

# Run with coverage
pytest --cov=app tests/

# Run with verbose output
pytest -v
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

### Manual Testing

1. Test all affected features
2. Test on different browsers (Chrome, Firefox, Safari)
3. Test responsive design (mobile, tablet, desktop)
4. Check console for errors
5. Verify API responses in Network tab

---

## Documentation

When adding new features, please update:

- **README.md** - For user-facing features
- **CONTRIBUTING.md** - For development processes
- **documentation/** - For detailed guides
- **Code comments** - For complex logic
- **API documentation** - Swagger docs in code

---

## Community

### Get Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community chat (coming soon)
- **Email**: boniyeamincse@gmail.com

### Stay Updated

- **Watch** the repository for updates
- **Star** the repository if you find it useful
- **Fork** to start contributing

### Recognition

Contributors will be:
- Listed in the [Contributors](https://github.com/boniyeamincse/SafeSphere/graphs/contributors) page
- Mentioned in release notes for significant contributions
- Featured in README acknowledgments

---

## Project Structure

```
SafeSphere/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── models/      # SQLAlchemy models
│   │   ├── routes/      # API endpoints
│   │   ├── schemas/     # Pydantic schemas
│   │   └── utils/       # Utility functions
│   ├── tests/           # Backend tests
│   └── init_db.py       # Database initialization
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── utils/       # Utility functions
│   └── tests/           # Frontend tests
├── documentation/       # Project documentation
├── docs/               # Additional docs
│   └── credentials/    # Credentials (not in git)
└── README.md           # Main documentation
```

---

## Frequently Asked Questions

### How do I get started if I'm new to open source?

Start with:
1. Read this guide thoroughly
2. Set up your development environment
3. Look for issues labeled `good first issue` or `beginner-friendly`
4. Ask questions! We're here to help

### What if I find a bug but can't fix it myself?

That's okay! Please report it with as much detail as possible. Bug reports are valuable contributions.

### How long does it take for PRs to be reviewed?

We aim to review PRs within 3-5 business days. Complex PRs may take longer.

### Can I work on an issue that's already assigned?

Please ask in the issue comments first. The assignee may be actively working on it.

### What if my PR is rejected?

Don't worry! We'll provide feedback on why and what changes are needed. You can update and resubmit.

---

## License

By contributing to SafeSphere, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

If you have any questions about contributing:

- 📧 **Email**: boniyeamincse@gmail.com
- 💬 **GitHub Issues**: Create an issue with the `question` label
- 📖 **Documentation**: Check our [documentation](documentation/index.html)

**Thank you for contributing to SafeSphere!** 🚀🛡️

Together, we're building a safer digital world!

---

*Last Updated: 2026-02-15*
*Version: 1.1*
