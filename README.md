# VitalflowX

## Backend Setup

The backend lives in `backend/` and uses FastAPI, async SQLAlchemy, PostgreSQL, Redis, Celery, and Alembic.

### Install dependencies

```bash
python3 -m pip install -r backend/requirements.txt
```

### Configure environment

Set database and broker values in your shell or a `backend/.env` file:

```bash
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/vitalflowx
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=change-me
BLOCKCHAIN_RPC=http://localhost:8545
```

### Run Alembic migrations

```bash
cd backend
python3 -m alembic upgrade head
```

### Seed demo data

```bash
python3 -m app.db.init_db
```

### Start the API

```bash
python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Start Celery workers

```bash
python3 -m celery -A app.workers.celery_app.celery worker --loglevel=info
```
