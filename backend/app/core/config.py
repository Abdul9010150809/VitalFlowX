from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "VitalFlowX"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/vitalflowx"
    REDIS_URL: str = "redis://localhost:6379/0"
    JWT_SECRET: str = "supersecretjwtkey"
    JWT_ALGORITHM: str = "HS256"
    BLOCKCHAIN_RPC: str = "http://localhost:8545"
    IPFS_GATEWAY: str = "https://ipfs.io/ipfs/"
    CONTRACT_ADDRESS: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
