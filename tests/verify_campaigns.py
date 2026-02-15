import requests
import time
import json

BASE_URL = "http://localhost:8000"

def run_test():
    print("Testing Campaign & Gamification Logic...")
    
    # 1. Register a User
    # Use valid email format and unique
    timestamp = int(time.time())
    email = f"campaign_creator_{timestamp}@example.com"
    password = "password123"
    
    print(f"1. Registering user: {email}")
    repo = requests.post(f"{BASE_URL}/auth/register", json={
        "email": email,
        "password": password,
        "name": "Campaign Creator",
        "role": "admin" # Assuming admin/creator role needed, though code allows any user currently
    })
    
    if repo.status_code != 200:
        print(f"Registration failed: {repo.text}")
        return
        
    # 2. Login
    print("2. Logging in...")
    repo = requests.post(f"{BASE_URL}/auth/login", json={
        "email": email,
        "password": password
    })
    token = repo.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    print("   Logged in successfully.")

    # 3. Create First Campaign
    print("3. Creating First Campaign (Should award badge)...")
    campaign_data = {
        "title": f"Phishing Test {timestamp}",
        "description": "A test campaign",
        "start_date": "2023-01-01T00:00:00",
        "end_date": "2023-12-31T23:59:59",
        "status": "draft"
    }
    
    repo = requests.post(f"{BASE_URL}/campaigns/", json=campaign_data, headers=headers)
    if repo.status_code == 200:
        print(f"   Campaign created: {repo.json()['id']}")
    else:
        print(f"❌ Campaign creation failed: {repo.text}")
        return
        
    # 4. Verify Gamification (Check Achievements)
    print("4. Verifying 'Campaign Creator' Badge...")
    repo = requests.get(f"{BASE_URL}/users/me/achievements", headers=headers)
    
    if repo.status_code == 200:
        achievements = repo.json()
        badges = [a['badge_name'] for a in achievements]
        print(f"   Current Badges: {badges}")
        
        if "Campaign Creator" in badges:
            print("✅ TEST PASSED: 'Campaign Creator' badge awarded.")
        else:
            print("❌ TEST FAILED: Badge not found.")
    else:
        print(f"❌ Failed to fetch achievements: {repo.text}")

    # 5. Idempotency Test (Create another campaign, ensure no duplicate badge)
    print("5. Testing Idempotency (Second Campaign)...")
    repo = requests.post(f"{BASE_URL}/campaigns/", json=campaign_data, headers=headers)
    
    repo = requests.get(f"{BASE_URL}/users/me/achievements", headers=headers)
    achievements = repo.json()
    badges = [a['badge_name'] for a in achievements]
    count = badges.count("Campaign Creator")
    
    if count == 1:
        print("✅ TEST PASSED: Badge not duplicated.")
    else:
        print(f"❌ TEST FAILED: Badge count is {count}, expected 1.")

if __name__ == "__main__":
    run_test()
