import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchRoute } from '../utils/mapService';
import { Navigation, Clock, ShieldCheck, Zap, Play, Pause, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShipments } from '../context/ShipmentContext';
import TransporterService from './TransporterService';

const LiveTracking = ({ shipmentId = null }) => {
  const { t } = useTranslation();
  const { shipments, loading: shipmentsLoading } = useShipments();
  
  const [routeCoords, setRouteCoords] = useState([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [carPosIndex, setCarPosIndex] = useState(0);
  const [activeShipment, setActiveShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eta, setEta] = useState(null);

  // Get shipment to display
  useEffect(() => {
    if (shipmentId) {
      const found = shipments.find(s => s.id === parseInt(shipmentId));
      setActiveShipment(found);
    } else if (shipments.length > 0) {
      // Show first active shipment
      const inTransit = shipments.find(s => s.status === 'in_transit');
      setActiveShipment(inTransit || shipments[0]);
    }
  }, [shipmentId, shipments]);

  // Fetch route coordinates from shipment data
  useEffect(() => {
    const loadRoute = async () => {
      if (!activeShipment) return;
      
      setLoading(true);
      try {
        // Parse origin and destination
        let startCoords = [40.7128, -74.006]; // Default NYC
        let endCoords = [34.0522, -118.2437]; // Default LA

        if (activeShipment.origin && typeof activeShipment.origin === 'string') {
          // Try to parse origin
          const parts = activeShipment.origin.split(',').map(p => parseFloat(p.trim()));
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            startCoords = [parts[0], parts[1]];
          }
        }

        if (activeShipment.destination && typeof activeShipment.destination === 'string') {
          // Try to parse destination
          const parts = activeShipment.destination.split(',').map(p => parseFloat(p.trim()));
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            endCoords = [parts[0], parts[1]];
          }
        }

        // Calculate ETA
        const etaData = TransporterService.calculateETA(startCoords[0], startCoords[1], endCoords[0], endCoords[1]);
        setEta(etaData);

        // Fetch route
        try {
          const data = await fetchRoute(startCoords, endCoords);
          if (data && data.features && data.features[0]) {
            const coords = data.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
            setRouteCoords(coords);
          } else {
            // Fallback: create simple line between start and end
            setRouteCoords([startCoords, endCoords]);
          }
        } catch (routeError) {
          console.warn('Route fetch failed, using direct line:', routeError);
          setRouteCoords([startCoords, endCoords]);
        }
      } catch (error) {
        console.error('Error loading route:', error);
        setRouteCoords([]);
      } finally {
        setLoading(false);
      }
    };

    loadRoute();
  }, [activeShipment]);

  const handleOptimize = async () => {
    if (!activeShipment) return;
    
    setIsOptimizing(true);
    try {
      const result = await TransporterService.optimizeRoute(
        40.7128, -74.006,
        34.0522, -118.2437
      );
      if (result) {
        // Optimize succeeded
      }
    } catch (error) {
      console.error('Route optimization failed:', error);
    } finally {
      setTimeout(() => setIsOptimizing(false), 2000);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    if (!activeShipment) return;
    
    try {
      if (newStatus === 'in_transit') {
        await TransporterService.acknowledgePickup(activeShipment.id);
      } else if (newStatus === 'delivered') {
        await TransporterService.reportDelivery(activeShipment.id);
      }
      // Refresh shipment data
      setActiveShipment(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const currentPos = routeCoords.length > 0 ? routeCoords[carPosIndex] : [37.0902, -95.7129];
  const progress = routeCoords.length > 0 ? (carPosIndex / routeCoords.length) * 100 : 0;

  if (shipmentsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!activeShipment) {
    return (
      <div className="space-y-8 animate-fade-in-up pb-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-[20px] p-6 flex items-center gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          <div>
            <h3 className="font-bold text-yellow-800">No Active Shipments</h3>
            <p className="text-yellow-700 text-sm">No shipments in transit found. Create or assign a shipment to view live tracking.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
            <Navigation className="w-8 h-8 text-indigo-600" /> {t('live_tracking')}
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Shipment {activeShipment?.id} • {activeShipment?.status?.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-xl ${
              isLive ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            }`}
          >
            {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isLive ? 'Pause Stream' : 'Resume Stream'}
          </button>
          <button 
            onClick={handleOptimize}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-xl ${
              isOptimizing ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            <Zap className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
            {isOptimizing ? 'Recalculating...' : 'Optimize Route'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Stats Column */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-700"><Clock className="w-24 h-24" /></div>
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Clock className="w-5 h-5" /></div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Predictive ETA</p>
                      <p className="text-xl font-black text-slate-800">
                        {eta ? new Date(eta.eta).toLocaleTimeString() : 'Calculating...'}
                      </p>
                   </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Progress</p>
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">{Math.round(progress)}% Completed</span>
                      <span className="text-xs font-bold text-indigo-600">{eta ? `${(eta.distance)} km` : 'N/A'}</span>
                   </div>
                   <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                   </div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-emerald-600" />
                   <div className="flex-1">
                      <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Geofence Status</p>
                      <p className="text-xs font-bold text-emerald-800">Inside Delivery Corridor</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="xl:col-span-3 h-[600px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl relative">
          {loading ? (
            <div className="flex items-center justify-center h-full bg-slate-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <MapContainer center={currentPos} zoom={4} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {routeCoords.length > 0 && <Polyline positions={routeCoords} color="#4f46e5" weight={5} opacity={0.6} />}
              <Marker position={currentPos}>
                <Popup>VTX-{activeShipment.id}: Active Telemetry Stream</Popup>
              </Marker>
              <Circle center={currentPos} radius={20000} pathOptions={{ color: '#6366f1', fillColor: '#6366f1', fillOpacity: 0.1 }} />
            </MapContainer>
          )}
          
          <div className="absolute top-8 right-8 z-[1000] flex flex-col gap-2">
             <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white flex items-center gap-4">
                <div className="flex flex-col text-right">
                   <span className="text-[10px] font-black text-slate-400 uppercase">Latitude</span>
                   <span className="text-sm font-mono font-bold">{currentPos[0].toFixed(4)}</span>
                </div>
                <div className="w-[1px] h-6 bg-slate-200"></div>
                <div className="flex flex-col text-right">
                   <span className="text-[10px] font-black text-slate-400 uppercase">Longitude</span>
                   <span className="text-sm font-mono font-bold">{currentPos[1].toFixed(4)}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;