import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Map, Navigation } from 'lucide-react';
import { routePlanData } from './dummyData';
import L from 'leaflet';

// Fix default marker icons for leaflet in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RoutePlan = () => {
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const waypoints = routePlanData.waypoints;
  const positions = waypoints.map(w => [w.lat, w.lng]);
  const center = [40.5, -78.0];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dynamic Routing Matrix</h2>
          <p className="text-slate-500 text-sm mt-1">{routePlanData.origin} → {routePlanData.destination} • {routePlanData.distance} {routePlanData.distanceUnit}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
          <Navigation className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">{routePlanData.carrier}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden" style={{height: '500px'}}>
          <MapContainer center={center} zoom={6} style={{height: '100%', width: '100%'}} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline positions={positions} color="#3b82f6" weight={3} opacity={0.8} dashArray="10,6" />
            {waypoints.map((wp, i) => (
              <Marker key={i} position={[wp.lat, wp.lng]} eventHandlers={{ click: () => setSelectedWaypoint(i) }}>
                <Popup>
                  <div className="text-center">
                    <p className="font-bold text-sm">{wp.name}</p>
                    <p className="text-xs text-gray-500">Node {i + 1}</p>
                    <p className="text-xs text-blue-600 mt-1">ETA: {new Date(wp.eta).toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Waypoint List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Map className="w-4 h-4" /> Route Nodes</h3>
          <div className="space-y-4">
            {waypoints.map((wp, i) => (
              <div
                key={i}
                onClick={() => setSelectedWaypoint(i)}
                className={`relative flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedWaypoint === i ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                {i < waypoints.length - 1 && (
                  <div className="absolute top-12 left-[22px] bottom-[-12px] w-0.5 bg-blue-200"></div>
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs z-10 ${
                  selectedWaypoint === i ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 border border-blue-200'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate">{wp.name}</p>
                  <p className="text-xs text-slate-500">{new Date(wp.eta).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Distance</p>
                <p className="font-bold text-slate-800">{routePlanData.distance} {routePlanData.distanceUnit}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Duration</p>
                <p className="font-bold text-slate-800">{routePlanData.estimatedDuration} {routePlanData.durationUnit}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Mode</p>
                <p className="font-bold text-slate-800 capitalize">{routePlanData.transportMode.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Carrier</p>
                <p className="font-bold text-slate-800">{routePlanData.carrier}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePlan;