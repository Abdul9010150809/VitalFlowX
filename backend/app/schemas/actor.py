from pydantic import BaseModel, EmailStr
from typing import Optional


class ActorCreate(BaseModel):
    name: str
    role: str
    email: EmailStr
    password: Optional[str]


class ActorRead(BaseModel):
    id: int
    name: str
    role: str
    email: EmailStr

    class Config:
        orm_mode = True
