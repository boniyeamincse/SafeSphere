# Default Admin Credentials

## Login Information

**Email:** `admin@safesphere.local`  
**Password:** `admin`

## How to Create the Admin Account

### Option 1: Using psql (Recommended)

```bash
# Connect to your PostgreSQL database
psql -U postgres -d safesphere

# Then run:
\i backend/create_admin.sql
```

### Option 2: Using pgAdmin or any PostgreSQL client

Copy and paste the contents of `backend/create_admin.sql` into your query tool and execute.

### Option 3: One-line command

```bash
psql -U postgres -d safesphere -f backend/create_admin.sql
```

## Accessing the Application

1. Start the backend server:
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --reload
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to: `http://localhost:5173`

4. Login with:
   - **Email:** admin@safesphere.local
   - **Password:** admin

## ⚠️ Security Warning

**IMPORTANT:** The default password `admin` should be changed immediately after your first login for security reasons.

To change the password:
1. Log in with the default credentials
2. Navigate to your profile settings
3. Update your password to a strong, unique password

## Troubleshooting

If you can't log in:
1. Verify the admin user exists in the database:
   ```sql
   SELECT * FROM users WHERE email = 'admin@safesphere.local';
   ```

2. Check that the password hash matches:
   ```sql
   SELECT password_hash FROM users WHERE email = 'admin@safesphere.local';
   ```
   It should be: `$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYlb4tXza`

3. Make sure your backend server is running and accessible

4. Check the browser console for any error messages
