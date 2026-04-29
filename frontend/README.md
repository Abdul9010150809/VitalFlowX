# Frontend Setup Guide

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server on http://localhost:5173
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests (if configured)

## Directory Structure

```
frontend/
├── src/
│   ├── common/              # Shared components and utilities
│   ├── inspector/           # Inspector role features
│   ├── producer/            # Producer role features
│   ├── regulator/           # Regulator role features
│   ├── retailer/            # Retailer role features
│   ├── transporter/         # Transporter role features
│   ├── warehouse/           # Warehouse role features
│   ├── layouts/             # Layout components
│   ├── routes/              # Route configuration
│   ├── assets/              # Static assets
│   ├── __tests__/           # Test files
│   ├── App.jsx              # Root component
│   ├── App.css              # Global styles
│   ├── main.jsx             # Entry point
│   ├── index.css            # CSS resets
│   └── setupTests.js        # Test configuration
├── public/                  # Public assets
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── eslint.config.js         # ESLint configuration
├── Dockerfile               # Docker configuration
├── index.html               # HTML template
└── .env.local.example       # Environment variables template

## Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Update values according to your backend configuration

```bash
cp .env.local.example .env.local
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Access the application at `http://localhost:5173`

## Building

```bash
npm run build
```

Output will be in the `dist/` directory.

## Docker

Build and run with Docker:

```bash
docker build -t vitalflowx-frontend .
docker run -p 5173:5173 vitalflowx-frontend
```

Or using docker-compose from root directory:

```bash
cd ..
docker-compose up frontend
```

## Configuration

### Vite Configuration
See `vite.config.js` for Vite-specific settings.

### Tailwind CSS
See `tailwind.config.js` for Tailwind customization.

### ESLint
See `eslint.config.js` for code quality rules.

## Testing

Tests are located in `src/__tests__/` directories alongside their respective features.

To run tests:
```bash
npm run test
```

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 5174
```

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
Ensure backend is running on `http://localhost:8000` and CORS is configured correctly.

## API Integration

All API calls should use `VITE_API_URL` environment variable.

Example:
```javascript
const response = await fetch(`${import.meta.env.VITE_API_URL}/shipments`);
```

## Contributing

1. Create feature branch
2. Make changes in respective role folder
3. Test thoroughly
4. Commit and push

## Documentation

For full project documentation, see:
- [Root README.md](../README.md)
- [Integration Guide](../INTEGRATION_GUIDE.md)
