# Contributing to SafeSphere 🤝

Thank you for your interest in contributing to SafeSphere! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, versions)

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear use case** for the enhancement
- **Detailed description** of the proposed functionality
- **Examples** of how it would work
- **Mockups or wireframes** if applicable

### 🔧 Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow coding standards** (see below)
3. **Write clear commit messages**
4. **Add tests** for new features
5. **Update documentation** as needed
6. **Ensure all tests pass**
7. **Submit your pull request**

## Development Workflow

### Setting Up Your Development Environment

1. **Fork and clone** the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/SafeSphere.git
   cd SafeSphere
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   
   # Frontend
   cd frontend
   npm install
   ```

4. **Make your changes** and test thoroughly

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**

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

### JavaScript/React (Frontend)

- Use **functional components** with hooks
- Follow **ESLint** rules
- Use **descriptive variable names**
- Keep components **small and reusable**
- Use **PropTypes** or TypeScript for type checking

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
```

### Git Commit Messages

Follow **Conventional Commits** specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Example:**
```
feat: add campaign scheduling feature

- Implement date/time picker for campaign scheduling
- Add cron job for scheduled campaign execution
- Update API endpoints to support scheduling
```

## Testing

### Backend Tests

```bash
cd backend
pytest tests/
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Documentation

When adding new features, please update:

- **README.md** - For user-facing features
- **API documentation** - For new endpoints
- **User Guide** - For new UI features
- **Code comments** - For complex logic

## Questions?

Feel free to:
- Open an issue for questions
- Join our community discussions
- Email: boniyeamin@brainless.dev

## Recognition

Contributors will be recognized in our:
- README.md contributors section
- Release notes
- Project acknowledgments

Thank you for contributing to SafeSphere! 🎉
