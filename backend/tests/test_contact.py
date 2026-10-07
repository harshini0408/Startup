from app.models.contact import ContactSubmission


def test_valid_contact_submission(client, db_session):
    payload = {
        "name": "Alex Mercer",
        "email": "alex@mercerlabs.io",
        "company": "Mercer Labs",
        "phone": "+1 555-0192",
        "project_type": "SaaS Platform",
        "budget_range": "$40,000 – $75,000",
        "timeline": "1–2 months",
        "message": "We need a distributed analytics backend with high-throughput streaming capabilities.",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "reference_id" in data
    assert data["reference_id"] is not None

    # Verify persistence in database
    saved = db_session.query(ContactSubmission).filter_by(email="alex@mercerlabs.io").first()
    assert saved is not None
    assert saved.name == "Alex Mercer"
    assert saved.status == "new"


def test_invalid_email(client):
    payload = {
        "name": "Alex Mercer",
        "email": "not-an-email",
        "company": "Mercer Labs",
        "message": "Valid project message exceeding the minimum character length required.",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert "errors" in data
    assert "email" in data["errors"]


def test_missing_required_fields(client):
    # Missing name and message
    payload = {
        "email": "alex@mercerlabs.io",
        "company": "Mercer Labs",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert "errors" in data
    assert "name" in data["errors"]
    assert "message" in data["errors"]


def test_oversized_message(client):
    payload = {
        "name": "Alex Mercer",
        "email": "alex@mercerlabs.io",
        "company": "Mercer Labs",
        "message": "x" * 5500,  # Exceeds max_length 5000
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert "message" in data["errors"]


def test_honeypot_contact_submission(client, db_session):
    payload = {
        "name": "Bot Sender",
        "email": "bot@spamnetwork.com",
        "company": "Spam Corp",
        "message": "Automated spam payload seeking commercial link placement.",
        "website_url": "https://spamlink.xyz",  # Honeypot filled!
    }
    response = client.post("/api/contact", json=payload)
    # Generic success returned so bots don't know they are trapped
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True

    # But saved in database as spam
    saved = db_session.query(ContactSubmission).filter_by(email="bot@spamnetwork.com").first()
    assert saved is not None
    assert saved.status == "spam"


def test_duplicate_contact_submission(client):
    payload = {
        "name": "Jane Cooper",
        "email": "jane@cooper-industries.com",
        "company": "Cooper Industries",
        "message": "Looking to build a custom real-time IoT visualization dashboard.",
    }
    # First submission
    res1 = client.post("/api/contact", json=payload)
    assert res1.status_code == 200
    ref1 = res1.json()["reference_id"]

    # Immediate second duplicate submission
    res2 = client.post("/api/contact", json=payload)
    assert res2.status_code == 200
    ref2 = res2.json()["reference_id"]

    # Returns existing reference ID without creating noisy duplicate leads
    assert ref1 == ref2
