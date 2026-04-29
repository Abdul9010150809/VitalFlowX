import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchRoute } from '../utils/mapService';

const LiveTracking = () => {
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    // Example start/end coordinates (could be dynamic)
    const start = [40.7128, -74.006]; // NYC
    const end = [34.0522, -118.2437]; // LA
    fetchRoute(start, end).then(data => {
      const coords = data.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
      setRouteCoords(coords);
    }).catch(console.error);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <h2 className="text-3xl font-black text-slate-800">Live Tracking</h2>
      <p className="text-slate-500">Real‑time route visualization between origin and destination.</p>
      <div className="h-[500px] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <MapContainer center={[37.0902, -95.7129]} zoom={4} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {routeCoords.length > 0 && <Polyline positions={routeCoords} color="#4f46e5" weight={4} />}
          <Marker position={[40.7128, -74.0060]}>
            <Popup>Origin (NYC)</Popup>
          </Marker>
          <Marker position={[34.0522, -118.2437]}>
            <Popup>Destination (LA)</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveTracking;