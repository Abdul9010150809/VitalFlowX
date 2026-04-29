import time
import hashlib
import hmac
from typing import Dict
import jwt
from app.core.config import settings


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(password: str, hashed: str) -> bool:
    return hmac.compare_digest(hash_password(password), hashed)


def create_access_token(subject: Dict, expires_in: int = 3600) -> str:
    payload = {"sub": subject, "iat": int(time.time()), "exp": int(time.time()) + expires_in}
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return token


def decode_token(token: str) -> Dict:
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
