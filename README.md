# VitalflowX - Full-Stack Supply Chain Intelligence Platform

A comprehensive full-stack application integrating a React/Vite frontend with a FastAPI backend for supply chain tracking, blockchain integration, and real-time monitoring.

## Project Structure

```
VitalflowX/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── common/             # Shared components
│   │   ├── inspector/          # Inspector role UI
│   │   ├── producer/           # Producer role UI
│   │   ├── regulator/          # Regulator role UI
│   │   ├── retailer/           # Retailer role UI
│   │   ├── transporter/        # Transporter role UI
│   │   ├── warehouse/          # Warehouse role UI
│   │   ├── layouts/            # Layout components
│   │   ├── routes/             # Route definitions
│   │   ├── assets/             # Static assets
│   │   └── App.jsx
│   ├── public/                 # Public assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/                     # FastAPI application
    ├── app/
    │   ├── main.py             # Application entry point
    │   ├── api/                # API routes
    │   ├── models/             # Database models
    │   ├── schemas/            # Pydantic schemas
    │   ├── services/           # Business logic
    │   ├── blockchain/         # Blockchain integration
    │   ├── db/                 # Database configuration
    │   ├── core/               # Core utilities
    │   ├── utils/              # Helper functions
    │   └── workers/            # Celery tasks
    ├── alembic/                # Database migrations
    ├── requirements.txt        # Python dependencies
    └── alembic.ini

## Key Features

- **Multi-Role Support**: Inspector, Producer, Regulator, Retailer, Transporter, Warehouse
- **Real-time Monitoring**: Live sensor data and shipment tracking
- **Blockchain Integration**: Web3 for on-chain verification
- **Alert System**: Anomaly detection and notifications
- **Document Management**: Verification and validation
- **Audit Trail**: Complete tracking and compliance

## Technology Stack

### Frontend
- React 19.2.5
- Vite 8.0.10
- React Router DOM 7.14.2
- Tailwind CSS 3.4.19
- Lucide React (Icons)

### Backend
- FastAPI
- SQLAlchemy ORM
- PostgreSQL (async with asyncpg)
- Celery for task queue
- Web3.py for blockchain
- Redis for caching

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL
- Redis

### Frontend Setup

```bash
cd VitalflowX

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file in backend/ directory with:
# DATABASE_URL=postgresql+asyncpg://user:password@localhost/vitalflowx
# REDIS_URL=redis://localhost:6379
# SECRET_KEY=your-secret-key
# BLOCKCHAIN_RPC=https://your-rpc-endpoint

# Run migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

## API Documentation

Once the backend is running, access the interactive API docs at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Routes

### Frontend Routes
- `/` - Entry page / Dashboard
- `/login` - Authentication
- `/inspector` - Inspector dashboard
- `/producer` - Producer dashboard
- `/regulator` - Regulator dashboard
- `/retailer` - Retailer dashboard
- `/transporter` - Transporter dashboard
- `/warehouse` - Warehouse dashboard

### Backend API Routes
- `/api/v1/sensors` - Sensor operations
- `/api/v1/shipments` - Shipment management
- `/api/v1/alerts` - Alert management
- `/api/v1/documents` - Document operations
- `/api/v1/events` - Event tracking
- `/api/v1/blockchain` - Blockchain integration

## Testing

### Frontend Tests
```bash
npm run test  # Run all tests
npm run test:watch  # Watch mode
npm run test:coverage  # Coverage report
```

Tests are located in `src/__tests__/` directories by feature.

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql+asyncpg://user:password@localhost/vitalflowx
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secure-secret-key
BLOCKCHAIN_RPC=https://your-rpc-endpoint
BLOCKCHAIN_CONTRACT_ADDRESS=0x...
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
```

## Development Workflow

1. Start Redis: `redis-server`
2. Start PostgreSQL database
3. Start backend: `cd backend && uvicorn app.main:app --reload`
4. Start frontend: `npm run dev`
5. Access at `http://localhost:5173`

## Building for Production

### Frontend
```bash
npm run build
# Output in dist/
```

### Backend
```bash
# Use production settings in .env
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Docker Support

Both frontend and backend can be containerized for deployment.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request

## License

MIT License
