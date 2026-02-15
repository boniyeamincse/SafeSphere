# SafeSphere API Reference

Complete API documentation for the SafeSphere backend.

**Base URL**: `http://localhost:8000`

## Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Groups](#groups)
- [Campaigns](#campaigns)
- [Campaign Assets](#campaign-assets)
- [Training](#training)

---

## Authentication

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "SecurePassword123!",
  "role": "member",
  "group_id": "uuid-optional"
}
```

**Response**: `201 Created`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "member",
  "group_id": "uuid-optional"
}
```

### Login

**POST** `/auth/login`

Authenticate a user and receive access token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response**: `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

---

## Users

All user endpoints require authentication. Include the token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

### Get Current User

**GET** `/users/me`

Get the authenticated user's information.

**Response**: `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "member",
  "group_id": "uuid"
}
```

### Get All Users

**GET** `/users/`

**Query Parameters**:
- `skip` (int): Number of records to skip (default: 0)
- `limit` (int): Maximum number of records (default: 100)

**Response**: `200 OK`
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "member",
    "group_id": "uuid"
  }
]
```

### Get User by ID

**GET** `/users/{user_id}`

**Response**: `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "member",
  "group_id": "uuid"
}
```

---

## Groups

### Create Group

**POST** `/groups/`

**Headers**: `Authorization: Bearer <token>` (Admin only)

**Request Body**:
```json
{
  "name": "IT Department",
  "description": "Information Technology team"
}
```

**Response**: `201 Created`
```json
{
  "id": "uuid",
  "name": "IT Department",
  "description": "Information Technology team",
  "created_at": "2026-02-15T08:00:00Z"
}
```

### Get All Groups

**GET** `/groups/`

**Response**: `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "IT Department",
    "description": "Information Technology team",
    "created_at": "2026-02-15T08:00:00Z"
  }
]
```

### Delete Group

**DELETE** `/groups/{group_id}`

**Headers**: `Authorization: Bearer <token>` (Admin only)

**Response**: `200 OK`
```json
{
  "message": "Group deleted successfully"
}
```

---

## Campaigns

### Create Campaign

**POST** `/campaigns/`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Q1 2026 Phishing Test",
  "description": "Quarterly phishing awareness campaign",
  "difficulty": "medium",
  "status": "draft",
  "track_opens": true,
  "track_clicks": true,
  "track_submissions": false,
  "start_date": "2026-03-01T09:00:00Z",
  "end_date": "2026-03-31T17:00:00Z",
  "smtp_profile_id": "uuid",
  "landing_page_id": "uuid",
  "email_template_id": "uuid",
  "target_group_ids": ["uuid1", "uuid2"]
}
```

**Response**: `201 Created`
```json
{
  "id": "uuid",
  "title": "Q1 2026 Phishing Test",
  "description": "Quarterly phishing awareness campaign",
  "difficulty": "medium",
  "status": "draft",
  "created_by": "uuid",
  "emails": [],
  "track_opens": true,
  "track_clicks": true,
  "track_submissions": false
}
```

### Get All Campaigns

**GET** `/campaigns/`

**Query Parameters**:
- `skip` (int): Pagination offset
- `limit` (int): Records per page

**Response**: `200 OK`
```json
[
  {
    "id": "uuid",
    "title": "Q1 2026 Phishing Test",
    "status": "active",
    "difficulty": "medium"
  }
]
```

### Get Campaign by ID

**GET** `/campaigns/{campaign_id}`

**Response**: `200 OK`
```json
{
  "id": "uuid",
  "title": "Q1 2026 Phishing Test",
  "description": "Quarterly phishing awareness campaign",
  "emails": [
    {
      "id": "uuid",
      "subject": "Urgent: Password Reset Required",
      "open_count": 45,
      "click_count": 12
    }
  ]
}
```

---

## Campaign Assets

### Email Templates

#### Create Email Template

**POST** `/assets/email-templates/`

**Request Body**:
```json
{
  "name": "Password Reset Template",
  "subject": "Urgent: Password Reset Required",
  "body": "<html>Dear {{FirstName}},...</html>",
  "variables": ["FirstName", "CompanyName"]
}
```

**Response**: `201 Created`

#### Get All Email Templates

**GET** `/assets/email-templates/`

### Landing Pages

#### Create Landing Page

**POST** `/assets/landing-pages/`

**Request Body**:
```json
{
  "name": "Microsoft Login Clone",
  "html_content": "<html>...</html>",
  "redirect_url": "https://training.safesphere.com/success",
  "capture_credentials": true,
  "mfa_enabled": false
}
```

**Response**: `201 Created`

#### Get All Landing Pages

**GET** `/assets/landing-pages/`

### SMTP Profiles

#### Create SMTP Profile

**POST** `/assets/smtp-profiles/`

**Request Body**:
```json
{
  "name": "Company SMTP",
  "host": "smtp.company.com",
  "port": 587,
  "username": "noreply@company.com",
  "password": "encrypted-password",
  "sender_email": "security@company.com",
  "sender_name": "Security Team",
  "use_tls": true,
  "use_ssl": false
}
```

**Response**: `201 Created`

#### Get All SMTP Profiles

**GET** `/assets/smtp-profiles/`

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden
```json
{
  "detail": "Not enough permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Rate Limiting

API requests are rate-limited to:
- **100 requests per minute** for authenticated users
- **20 requests per minute** for unauthenticated endpoints

## Swagger Documentation

Interactive API documentation is available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

For support or questions:
- GitHub Issues: https://github.com/boniyeamincse/SafeSphere/issues
- Email: api-support@safesphere.dev
