import React, { useState } from 'react';
import { Truck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { shipmentsData } from './dummyData';
import { formatDate } from '../../utils/helpers';

const ShipmentsView = () => {
  const [shipments] = useState(shipmentsData);
  const [selectedId, setSelectedId] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_transit':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Truck className="w-4 h-4" />;
    }
  };

  const selected = shipments.find(s => s.id === selectedId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipments</h2>
          <div className="space-y-3">
            {shipments.map(ship => (
              <div
                key={ship.id}
                onClick={() => setSelectedId(ship.id)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedId === ship.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{ship.id}</p>
                    <p className="text-sm text-gray-600">{ship.product}</p>
                    <p className="text-xs text-gray-500 mt-1">{ship.origin} → {ship.destination}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(ship.status)}`}>
                      {getStatusIcon(ship.status)} {ship.status.replace('_', ' ')}
                    </span>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${ship.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        {selected && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{selected.id}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-600 uppercase">Product</p>
                <p className="font-semibold text-gray-900">{selected.product}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase">Batch</p>
                <p className="font-semibold text-gray-900">{selected.batchNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase">Quantity</p>
                <p className="font-semibold text-gray-900">{selected.quantity} {selected.unit}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase">Temperature</p>
                <p className="font-semibold text-blue-600">{selected.temperature}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase">Route</p>
                <p className="font-semibold text-gray-900 text-sm">{selected.origin} → {selected.destination}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase">ETA</p>
                <p className="font-semibold text-gray-900">{formatDate(selected.estimatedDelivery)}</p>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentsView;
