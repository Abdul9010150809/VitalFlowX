# VitalflowX - Frontend & Backend Integration Guide

This guide explains how to set up and run the complete VitalflowX application with both frontend and backend integrated.

## Quick Start (All-in-One)

### 1. Prerequisites Installation

```bash
# macOS (using Homebrew)
brew install node postgresql redis python@3.10

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs postgresql postgresql-contrib redis-server python3.10 python3.10-venv

# Windows (using Chocolatey)
choco install nodejs postgresql redis python
```

### 2. Clone and Navigate
```bash
git clone https://github.com/Abdul9010150809/VitalflowX.git
cd VitalflowX
```

### 3. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Update .env with your configurations
# nano .env  (or use your preferred editor)

# Run database migrations
alembic upgrade head

# Start backend (from backend directory)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Backend is now running on http://localhost:8000
```

### 4. Frontend Setup (In a new terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Update .env.local with your configurations (optional)
# nano .env.local  (or use your preferred editor)

# Start development server
npm run dev

# Frontend is now running on http://localhost:5173
```

## Services Setup

### PostgreSQL Database Setup

```bash
# Start PostgreSQL service
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# PostgreSQL service usually auto-starts, or use pgAdmin

# Create database and user
psql -U postgres
```

In PostgreSQL shell:
```sql
CREATE DATABASE vitalflowx;
CREATE USER vitalflow_user WITH PASSWORD 'your_secure_password';
ALTER ROLE vitalflow_user SET client_encoding TO 'utf8';
ALTER ROLE vitalflow_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE vitalflow_user SET default_transaction_deferrable TO on;
ALTER ROLE vitalflow_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE vitalflowx TO vitalflow_user;
\q
```

Update your `.env` file:
```
DATABASE_URL=postgresql+asyncpg://vitalflow_user:your_secure_password@localhost:5432/vitalflowx
```

### Redis Setup

```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis-server

# Windows
# Use Windows Subsystem for Linux or Docker

# Verify Redis is running
redis-cli ping
# Should return: PONG
```

## API Integration

### Frontend API Configuration

The frontend communicates with the backend through API endpoints. Update `src/common/config.js` or similar:

```javascript
// Frontend API Base URL
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000';

// API endpoints
export const ENDPOINTS = {
  SENSORS: `${API_BASE_URL}/api/v1/sensors`,
  SHIPMENTS: `${API_BASE_URL}/api/v1/shipments`,
  ALERTS: `${API_BASE_URL}/api/v1/alerts`,
  DOCUMENTS: `${API_BASE_URL}/api/v1/documents`,
  EVENTS: `${API_BASE_URL}/api/v1/events`,
  AUTH: `${API_BASE_URL}/api/v1/auth`,
};
```

### Frontend Environment Variables

Create `.env.local` in the root directory:

```
VITE_API_URL=http://localhost:8000
VITE_BLOCKCHAIN_RPC=https://sepolia.infura.io/v3/YOUR_KEY
```

### Backend CORS Configuration

Already configured in `backend/app/core/config.py`:

```python
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]
```

## Authentication Flow

1. **Frontend Login**: User enters credentials at `/login`
2. **Backend Validation**: Backend validates against database
3. **JWT Token**: Backend returns JWT token
4. **Token Storage**: Frontend stores JWT in localStorage/sessionStorage
5. **API Requests**: Frontend includes JWT in Authorization header
6. **Token Refresh**: Automatic refresh using refresh token

### Example API Call from Frontend

```javascript
const response = await fetch('http://localhost:8000/api/v1/shipments', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
const data = await response.json();
```

## Testing the Integration

### 1. Verify Backend is Running
```bash
curl http://localhost:8000/docs
# Should return Swagger UI documentation
```

### 2. Test API Endpoint
```bash
curl -X GET http://localhost:8000/api/v1/sensors
# Should return sensor data or appropriate error
```

### 3. Verify Frontend Loads
```bash
# Visit http://localhost:5173 in browser
# Should load React application
```

### 4. Test Frontend-Backend Communication
- Open browser DevTools (F12)
- Go to Network tab
- Try logging in or performing an action
- Verify API calls to http://localhost:8000 show 200 status

## Development Workflow

### Terminal 1 - Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

### Terminal 3 - Celery (for background jobs)
```bash
cd backend
celery -A app.workers.celery_app worker -l info
```

### Terminal 4 - Redis (if not running as service)
```bash
redis-server
```

## Docker Setup (Alternative)

### Using Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: vitalflow_user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: vitalflowx
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql+asyncpg://vitalflow_user:password@postgres:5432/vitalflowx
      REDIS_URL: redis://redis:6379

  frontend:
    build: .
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

Run with:
```bash
docker-compose up
```

## Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>
```

**Database Connection Error**
```bash
# Check PostgreSQL is running
psql -U postgres -d vitalflowx

# Reset database
dropdb vitalflowx
createdb vitalflowx
```

**Module Not Found**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend Issues

**Module Not Found**
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**CORS Error**
```
# Update CORS_ORIGINS in backend/app/core/config.py
# Make sure frontend URL is included
```

**API Not Responding**
```
# Check backend is running on http://localhost:8000/docs
# Check network tab in browser DevTools
```

## Production Deployment

### Frontend Build
```bash
cd frontend
npm run build
# Creates optimized build in dist/
# Deploy dist/ contents to web server
```

### Backend Deployment
```bash
cd backend
# Use production settings in .env
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Common Commands

| Task | Command |
|------|---------|
| Start Backend | `cd backend && uvicorn app.main:app --reload` |
| Start Frontend | `cd frontend && npm run dev` |
| Build Frontend | `cd frontend && npm run build` |
| Run Migrations | `cd backend && alembic upgrade head` |
| Create Migration | `cd backend && alembic revision --autogenerate -m "message"` |
| Run Tests (Frontend) | `cd frontend && npm run test` |
| Lint Code | `cd frontend && npm run lint` |
| Access API Docs | `http://localhost:8000/docs` |
| Access Frontend | `http://localhost:5173` |

## Support and Documentation

- Backend API Docs: `http://localhost:8000/docs`
- FastAPI Docs: https://fastapi.tiangolo.com/
- React Docs: https://react.dev/
- Vite Docs: https://vitejs.dev/

## Next Steps

1. Set up environment variables
2. Initialize database
3. Start backend and frontend
4. Access frontend at http://localhost:5173
5. Start developing!
