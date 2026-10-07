from app.models.quote import QuoteRequest


def test_valid_quote_submission(client, db_session):
    payload = {
        "services": ["Web application", "AI solution"],
        "project_stage": "Requirements ready",
        "priorities": ["Build scalable product", "Integrate AI"],
        "budget_range": "$60,000 – $120,000 (Full-Scale System)",
        "timeline": "3–6 months",
        "name": "Sarah Chen",
        "email": "sarah@chentechnologies.com",
        "company": "Chen Technologies",
        "phone": "+1 415-555-2671",
        "project_description": "We are architecting an enterprise agentic workflow management console.",
    }
    response = client.post("/api/quote", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "reference_id" in data
    assert data["reference_id"] is not None

    # Verify persistence
    saved = db_session.query(QuoteRequest).filter_by(email="sarah@chentechnologies.com").first()
    assert saved is not None
    assert saved.company == "Chen Technologies"
    assert "Web application" in saved.services


def test_invalid_quote_email(client):
    payload = {
        "services": ["Website"],
        "project_stage": "Idea",
        "priorities": ["Launch quickly"],
        "budget_range": "$15,000 – $30,000",
        "timeline": "1–2 months",
        "name": "Sarah Chen",
        "email": "sarah-not-an-email",
        "company": "Chen Technologies",
    }
    response = client.post("/api/quote", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert "email" in data["errors"]


def test_empty_services_or_priorities(client):
    payload = {
        "services": [],  # Min length 1 required
        "project_stage": "Idea",
        "priorities": ["Launch quickly"],
        "budget_range": "$15,000 – $30,000",
        "timeline": "1–2 months",
        "name": "Sarah Chen",
        "email": "sarah@chentechnologies.com",
        "company": "Chen Technologies",
    }
    response = client.post("/api/quote", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert "services" in data["errors"]


def test_honeypot_quote_submission(client, db_session):
    payload = {
        "services": ["SaaS"],
        "project_stage": "Idea",
        "priorities": ["Launch quickly"],
        "budget_range": "$30,000 – $60,000",
        "timeline": "1–2 months",
        "name": "Spam Bot",
        "email": "bot@automatedspambot.com",
        "company": "Botnet LLC",
        "website_url": "https://malicious-seo-link.com",
    }
    response = client.post("/api/quote", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True

    saved = db_session.query(QuoteRequest).filter_by(email="bot@automatedspambot.com").first()
    assert saved is not None
    assert saved.status == "spam"
