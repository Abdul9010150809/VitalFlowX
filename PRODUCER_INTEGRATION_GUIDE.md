# VitalflowX Producer Module - Integration Guide

## Overview
The producer module has been enhanced with comprehensive features, dummy data, and service layer integration for a production-ready cold chain logistics platform.

## Architecture

### Service Layer: `ProducerService.js`
Centralized API communication layer for all producer operations:
- **Shipment Management**: `getShipments()`, `createShipment()`, `updateShipment()`, `bindSensors()`
- **Document Handling**: `uploadDocuments()`
- **Blockchain**: `registerOnBlockchain()`, `getLedger()`
- **Alerts**: `getAlerts()`, `acknowledgeAlert()`
- **Sensors**: `getSensorData()`, `getRiskAssessment()`, `generateQRCode()`
- **Events**: `getEvents()`, `createExceptionCase()`

### Data Layer: `dummyData.js`
Comprehensive mock data covering all producer features:
- **shipmentsData**: 4 shipments with temperature, humidity, tracking info
- **alertsData**: 4 alerts with severities (critical, warning, info)
- **ledgerData**: 3 blockchain transactions
- **documentsData**: 3 verified documents with hashes
- **sensorsData**: 4 sensors with real-time readings
- **tempRulesData**: 3 temperature rule configurations
- **batchConfigData**: 2 batch configurations with expiry dates
- **riskAssessmentData**: Risk scoring with recommendations
- **routePlanData**: Multi-waypoint route with ETAs
- **actorKeySetupData**: Actor roles with blockchain permissions
- **eventsData**: 3 event logs with timestamps

## Component Implementation

### Enhanced Components

#### 1. **CreateShipment_v2.jsx**
Form-based shipment creation with:
- Form validation with error display
- Async operation handling via `useAsync` hook
- Loading states with `LoadingOverlay`
- Toast notifications for feedback
- 7 input fields with required validation
- Clear button to reset form

**Usage:**
```jsx
import CreateShipment from './CreateShipment_v2';
```

#### 2. **ShipmentsViewV2.jsx**
Two-column shipment tracking interface:
- Left: Shipment list with status indicators
- Right: Selected shipment details panel
- Progress bars for shipment tracking
- Status color coding (in_transit, delivered, pending)
- Real-time temperature display

**Usage:**
```jsx
import ShipmentsView from './ShipmentsViewV2';
```

#### 3. **LedgerViewV2.jsx**
Blockchain transaction explorer:
- Expandable transaction entries
- Full transaction data visualization
- Actor address display
- Copy-to-clipboard functionality
- Links to Etherscan
- Pretty-printed JSON data display

**Usage:**
```jsx
import LedgerView from './LedgerViewV2';
```

#### 4. **AlertsMonitor_Improved.jsx**
Advanced alert management system:
- Alert statistics dashboard (Critical, Active, Resolved)
- Multi-filter system (all, critical, warning, info)
- Severity-based styling
- Acknowledge action for active alerts
- Empty state with success icon
- Real-time alert count in filters

**Usage:**
```jsx
import AlertsMonitor from './AlertsMonitor_Improved';
```

## Hook Integration

The producer module leverages custom hooks for optimal functionality:

### `useToast()` - Toast Notifications
```javascript
const { success, error, info, warning } = useToast();
success('Operation completed!');
error('Something went wrong');
```

### `useAsync()` - Async Operations
```javascript
const { execute, status, data, error } = useAsync(asyncFn, false);
await execute();
// status: 'idle' | 'pending' | 'success' | 'error'
```

### `useFetch()` - Data Fetching
```javascript
const { data, isLoading, error, refetch } = useFetch('/api/v1/shipments');
```

### `useLocalStorage()` - Persistent Storage
```javascript
const [value, setValue] = useLocalStorage('key', 'default');
```

## Workflow Integration

### 1. Shipment Creation Workflow
```
User Form Input
    ↓
validateForm()
    ↓
useAsync(ProducerService.createShipment)
    ↓
Success → Toast Notification → Clear Form
    ↓
Error → Error Toast → Display Field Errors
```

### 2. Alert Monitoring Workflow
```
Load alertsData from dummyData.js
    ↓
Filter by severity
    ↓
User clicks Acknowledge
    ↓
ProducerService.acknowledgeAlert(id)
    ↓
Update local state
    ↓
Success Toast
```

### 3. Blockchain Ledger Workflow
```
Load ledgerData from dummyData.js
    ↓
User clicks to expand entry
    ↓
Show transaction details
    ↓
User copies hash or views on Etherscan
```

## API Integration Points

Connect these components to real APIs by updating `ProducerService.js`:

### Shipment Endpoints
```javascript
POST /api/v1/shipments/create
GET /api/v1/shipments
PUT /api/v1/shipments/{id}
GET /api/v1/shipments/{id}
```

### Alert Endpoints
```javascript
GET /api/v1/alerts
POST /api/v1/alerts/{id}/acknowledge
```

### Blockchain Endpoints
```javascript
GET /api/v1/blockchain/ledger
POST /api/v1/blockchain/deploy
```

### Document Endpoints
```javascript
POST /api/v1/documents/upload
```

## Backend Requirements

The backend must provide these endpoint implementations:

### 1. Shipment Model (Alembic Migration Needed)
```python
class Shipment(Base):
    __tablename__ = "shipments"
    
    id: str
    product: str
    batch_number: str
    quantity: int
    origin: str
    destination: str
    temperature: str
    humidity: str
    status: str  # pending, in_transit, delivered
    progress: int  # 0-100
    estimated_delivery: datetime
    created_at: datetime
```

### 2. Alert Model
```python
class Alert(Base):
    __tablename__ = "alerts"
    
    id: str
    severity: str  # critical, warning, info
    type: str
    shipment_id: str
    message: str
    status: str  # active, resolved
    acknowledged_by: Optional[str]
    timestamp: datetime
```

### 3. CRUD Endpoints
All endpoints should return:
```json
{
  "success": true,
  "data": { /* payload */ },
  "message": "Operation successful"
}
```

Error responses:
```json
{
  "success": false,
  "data": null,
  "message": "Error description"
}
```

## File Structure
```
frontend/src/producer/
├── ProducerService.js          # Centralized API client
├── dummyData.js                 # Comprehensive mock data
├── ProducerDashboard.jsx        # Main dashboard (existing)
├── CreateShipment_v2.jsx        # NEW: Form with validation
├── ShipmentsViewV2.jsx          # NEW: Tracking interface
├── LedgerViewV2.jsx             # NEW: Blockchain explorer
├── AlertsMonitor_Improved.jsx   # NEW: Alert management
└── [15 other component files]   # Ready for implementation
```

## Testing Checklist

- [ ] Verify all imports resolve correctly
- [ ] Test form validation in CreateShipment_v2.jsx
- [ ] Confirm toast notifications display
- [ ] Check loading overlays appear during async ops
- [ ] Test shipment selection in ShipmentsViewV2.jsx
- [ ] Verify ledger expansion/collapse functionality
- [ ] Test alert filtering in AlertsMonitor
- [ ] Confirm copy-to-clipboard works
- [ ] Validate error boundary catches component errors
- [ ] Check responsive design on mobile

## Next Steps

1. **Backend Development**:
   - Implement missing endpoint handlers
   - Create database migrations for all models
   - Add authentication to endpoints
   - Implement error handling

2. **API Integration**:
   - Replace `dummyData.js` calls with real API endpoints
   - Update ProducerService.js to use production URLs
   - Add authentication token handling

3. **Additional Components**:
   - Complete SensorBinding.jsx with sensor binding logic
   - Implement DocumentPreview.jsx with file viewer
   - Build RoutePlan.jsx with map integration
   - Create QRGenerator.jsx with QR code library

4. **Performance**:
   - Add pagination to shipment lists
   - Implement caching for ledger data
   - Optimize image uploads
   - Add request debouncing

## Environment Variables

Update `.env.local` (frontend):
```
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
```

Update `.env` (backend):
```
DATABASE_URL=postgresql+asyncpg://user:password@localhost/vitalflowx
REDIS_URL=redis://localhost:6379
ETHEREUM_RPC_URL=https://rpc.example.com
```

## Support

For issues or questions:
1. Check console for error messages
2. Verify all hooks are correctly imported
3. Ensure ProducerService endpoints match backend URLs
4. Validate API responses match expected data structure
