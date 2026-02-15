import requests
import json

BASE_URL = "http://localhost:8000"

def run_test():
    print("Testing Quiz Logic...")
    
    # 1. Register a User
    email = f"quiz_tester_{int(requests.get('https://api.github.com/zen').status_code) + 123456}@example.com" # Random-ish email
    import time
    email = f"quiz_tester_{int(time.time())}@example.com"
    password = "password123"
    
    print(f"1. Registering user: {email}")
    repo = requests.post(f"{BASE_URL}/auth/register", json={
        "email": email,
        "password": password,
        "name": "Quiz Tester",
        "role": "member"
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

    # 3. Create Training Module (No Auth needed currently, but usually Admin)
    print("3. Creating Training Module...")
    quiz_content = {
        "questions": [
            {
                "id": "q1",
                "question": "What is phishing?",
                "options": ["A sport", "A cyber attack"],
                "correct_answer": "A cyber attack"
            },
            {
                "id": "q2",
                "question": "Is HTTP secure?",
                "options": ["Yes", "No"],
                "correct_answer": "No"
            }
        ]
    }
    
    module_data = {
        "title": "Phishing 101",
        "content": "Phishing is bad.",
        "quiz": quiz_content
    }
    
    repo = requests.post(f"{BASE_URL}/training/", json=module_data, headers=headers)
    if repo.status_code != 200:
        print(f"Module creation failed: {repo.text}")
        return
        
    module_id = repo.json()["id"]
    print(f"   Module created: {module_id}")

    # 4. Submit Quiz (Perfect Score)
    print("4. Submitting Quiz (100% Correct)...")
    submission_data = {
        "answers": {
            "q1": "A cyber attack",
            "q2": "No"
        }
    }
    
    repo = requests.post(
        f"{BASE_URL}/training/{module_id}/submit", 
        json=submission_data,
        headers=headers
    )
    
    if repo.status_code == 200:
        result = repo.json()
        print(f"   Success! Score: {result['quiz_score']}%")
        print(f"   Progress: {result['progress']}%")
        
        if result['quiz_score'] == 100:
            print("✅ TEST PASSED: Perfect score calculation correct.")
        else:
            print("❌ TEST FAILED: Score calculation incorrect.")
    else:
        print(f"❌ Submission failed: {repo.text}")

    # 5. Submit Quiz (50% Score)
    print("5. Submitting Quiz (50% Correct)...")
    submission_data = {
        "answers": {
            "q1": "A cyber attack",
            "q2": "Yes" # Wrong
        }
    }
    
    repo = requests.post(
        f"{BASE_URL}/training/{module_id}/submit", 
        json=submission_data,
        headers=headers
    )
    
    if repo.status_code == 200:
        result = repo.json()
        print(f"   Success! Score: {result['quiz_score']}%")
        if result['quiz_score'] == 50:
            print("✅ TEST PASSED: Partial score calculation correct.")
        else:
            print(f"❌ TEST FAILED: Score calculation incorrect. Expected 50, got {result['quiz_score']}")
    else:
        print(f"❌ Submission failed: {repo.text}")

if __name__ == "__main__":
    run_test()
