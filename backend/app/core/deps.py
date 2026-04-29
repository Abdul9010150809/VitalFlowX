from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.security import decode_token
from app.models.actor import Actor

security = HTTPBearer()


async def get_db_dep() -> AsyncSession:
    async for s in get_db():
        yield s


async def get_current_actor(credentials: HTTPAuthorizationCredentials = Depends(security), db: AsyncSession = Depends(get_db_dep)) -> Actor:
    token = credentials.credentials
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    sub = payload.get("sub")
    if not sub:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    actor_id = sub.get("id")
    if not actor_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token subject")
    actor = await db.get(Actor, actor_id)
    if not actor:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Actor not found")
    return actor


def require_role(*allowed_roles):
    async def role_checker(actor: Actor = Depends(get_current_actor)):
        if actor.role not in allowed_roles:
            raise HTTPException(status_code=403, detail="Insufficient role")
        return actor

    return role_checker
