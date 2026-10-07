from app.core.security import hash_ip
from app.services.spam_service import SpamService


def test_ip_hashing():
    ip1 = "192.168.1.100"
    ip2 = "192.168.1.101"

    hash1 = hash_ip(ip1)
    hash2 = hash_ip(ip2)

    assert hash1 is not None
    assert hash2 is not None
    assert hash1 != hash2
    assert hash1 == hash_ip(ip1)  # Deterministic with same salt
    assert len(hash1) == 64  # SHA-256


def test_honeypot_logic():
    assert SpamService.is_honeypot_triggered("http://spam.com") is True
    assert SpamService.is_honeypot_triggered("") is False
    assert SpamService.is_honeypot_triggered(None) is False


def test_rate_limiter():
    test_ip_hash = "mock_test_hash_unique_for_limiter"

    # Reset history for this hash
    SpamService._ip_request_history[test_ip_hash] = []

    # First 5 requests should pass
    for _ in range(5):
        allowed, _ = SpamService.check_rate_limit(test_ip_hash)
        assert allowed is True

    # 6th request within window must be rate limited
    allowed, reason = SpamService.check_rate_limit(test_ip_hash)
    assert allowed is False
    assert "Rate limit exceeded" in reason
