import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShipments } from '../context/ShipmentContext';
import TransporterService from './TransporterService';
import { Truck, MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const TransporterShipments = () => {
  const { t } = useTranslation();
  const { fetchShipments, shipments, loading, error } = useShipments();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [eta, setEta] = useState(null);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const handleSelectShipment = async (shipment) => {
    setSelectedShipment(shipment);
    const details = await TransporterService.getShipmentDetails(shipment.id);
    setShipmentDetails(details);
    
    if (details) {
      const etaData = TransporterService.calculateETA(
        40.7128, -74.006,
        34.0522, -118.2437,
        60
      );
      setEta(etaData);
    }
  };

  const handleAcknowledgePickup = async (shipmentId) => {
    try {
      await TransporterService.acknowledgePickup(shipmentId);
      fetchShipments();
      setSelectedShipment(prev => ({ ...prev, status: 'in_transit' }));
    } catch (error) {
      console.error('Error acknowledging pickup:', error);
    }
  };

  const handleReportDelivery = async (shipmentId) => {
    try {
      await TransporterService.reportDelivery(shipmentId);
      fetchShipments();
      setSelectedShipment(prev => ({ ...prev, status: 'delivered' }));
    } catch (error) {
      console.error('Error reporting delivery:', error);
    }
  };

  const filteredShipments = shipments.filter(s => {
    if (activeTab === 'pending') return s.status === 'pending';
    if (activeTab === 'in_transit') return s.status === 'in_transit';
    if (activeTab === 'delivered') return s.status === 'delivered';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in_transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'in_transit':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
            <Truck className="w-8 h-8 text-indigo-600" /> Shipments
          </h2>
          <p className="text-slate-500 font-medium mt-1">Manage and track all assigned shipments</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        {[
          { id: 'all', label: 'All', count: shipments.length },
          { id: 'pending', label: 'Pending', count: shipments.filter(s => s.status === 'pending').length },
          { id: 'in_transit', label: 'In Transit', count: shipments.filter(s => s.status === 'in_transit').length },
          { id: 'delivered', label: 'Delivered', count: shipments.filter(s => s.status === 'delivered').length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-800'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-[20px] p-6 flex items-center gap-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="font-bold text-red-800">Error Loading Shipments</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipments List */}
          <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
            {filteredShipments.length === 0 ? (
              <div className="bg-slate-50 rounded-[20px] p-6 text-center">
                <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 font-medium">No shipments found</p>
              </div>
            ) : (
              filteredShipments.map(shipment => (
                <button
                  key={shipment.id}
                  onClick={() => handleSelectShipment(shipment)}
                  className={`w-full text-left p-4 rounded-[20px] border-2 transition-all ${
                    selectedShipment?.id === shipment.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : `border-slate-200 ${getStatusColor(shipment.status)} hover:border-indigo-300`
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-sm">SHP-{shipment.id}</p>
                      <p className="text-xs text-slate-600 mt-1 truncate">{shipment.destination}</p>
                    </div>
                    {getStatusIcon(shipment.status)}
                  </div>
                  <p className="text-xs font-bold mt-2 capitalize">{shipment.status.replace('_', ' ')}</p>
                </button>
              ))
            )}
          </div>

          {/* Shipment Details */}
          <div className="lg:col-span-2">
            {selectedShipment ? (
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className={`p-6 ${getStatusColor(selectedShipment.status)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black">Shipment SHP-{selectedShipment.id}</h3>
                      <p className="text-sm font-medium mt-1 capitalize">{selectedShipment.status.replace('_', ' ')}</p>
                    </div>
                    {getStatusIcon(selectedShipment.status)}
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Origin & Destination */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">From</p>
                      <p className="font-bold text-slate-800">{selectedShipment.origin || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">To</p>
                      <p className="font-bold text-slate-800">{selectedShipment.destination || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Product Details */}
                  {selectedShipment.product_details && (
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Product</p>
                      <p className="font-bold text-slate-800">
                        {typeof selectedShipment.product_details === 'object'
                          ? selectedShipment.product_details.name || JSON.stringify(selectedShipment.product_details)
                          : selectedShipment.product_details}
                      </p>
                    </div>
                  )}

                  {/* ETA */}
                  {eta && (
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Estimated Arrival</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-600" />
                        <p className="font-bold text-slate-800">{new Date(eta.eta).toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Distance: {eta.distance} km</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    {selectedShipment.status === 'pending' && (
                      <button
                        onClick={() => handleAcknowledgePickup(selectedShipment.id)}
                        className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-2xl hover:bg-indigo-700 transition-colors"
                      >
                        Acknowledge Pickup
                      </button>
                    )}
                    {selectedShipment.status === 'in_transit' && (
                      <button
                        onClick={() => handleReportDelivery(selectedShipment.id)}
                        className="flex-1 bg-green-600 text-white font-bold py-3 rounded-2xl hover:bg-green-700 transition-colors"
                      >
                        Report Delivery
                      </button>
                    )}
                    {selectedShipment.status === 'delivered' && (
                      <button
                        disabled
                        className="flex-1 bg-slate-200 text-slate-600 font-bold py-3 rounded-2xl cursor-not-allowed"
                      >
                        Delivery Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-[40px] border border-slate-200 p-12 text-center">
                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 font-bold">Select a shipment to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransporterShipments;
