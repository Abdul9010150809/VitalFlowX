import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShipments } from '../context/ShipmentContext';
import WarehouseService from './WarehouseService';
import { Package, AlertCircle, CheckCircle, Thermometer } from 'lucide-react';

const WarehouseReceiptTracking = () => {
  const { t } = useTranslation();
  const { fetchShipments, shipments, loading, error, updateShipmentStatus } = useShipments();
  const [activeTab, setActiveTab] = useState('incoming');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [receiveNotes, setReceiveNotes] = useState('');

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const handleSelectShipment = async (shipment) => {
    setSelectedShipment(shipment);
    const details = await WarehouseService.getShipmentHistory(shipment.id);
    setShipmentDetails(details);
    
    // Get sensor data
    const sensors = await WarehouseService.getZoneSensorData(shipment.id);
    setSensorData(sensors);
  };

  const handleReceiveShipment = async () => {
    try {
      await WarehouseService.receiveShipment(selectedShipment.id, {
        notes: receiveNotes,
        receivedBy: 'warehouse_staff',
      });
      
      await updateShipmentStatus(selectedShipment.id, 'received');
      fetchShipments();
      setShowReceiveModal(false);
      setReceiveNotes('');
      setSelectedShipment(prev => ({ ...prev, status: 'received' }));
    } catch (error) {
      console.error('Error receiving shipment:', error);
    }
  };

  const incomingShipments = shipments.filter(s => s.status === 'in_transit');
  const receivedShipments = shipments.filter(s => s.status === 'received');

  const displayedShipments = activeTab === 'incoming' ? incomingShipments : receivedShipments;

  const getTemperatureStatus = (reading) => {
    if (reading < 2 || reading > 8) {
      return { status: 'violation', color: 'text-red-600' };
    }
    return { status: 'compliant', color: 'text-green-600' };
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
            <Package className="w-8 h-8 text-indigo-600" /> Receipt Tracking
          </h2>
          <p className="text-slate-500 font-medium mt-1">Monitor incoming shipments and storage conditions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        {[
          { id: 'incoming', label: 'Incoming', count: incomingShipments.length },
          { id: 'received', label: 'Received', count: receivedShipments.length },
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
            {displayedShipments.length === 0 ? (
              <div className="bg-slate-50 rounded-[20px] p-6 text-center">
                <Package className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 font-medium">No shipments found</p>
              </div>
            ) : (
              displayedShipments.map(shipment => (
                <button
                  key={shipment.id}
                  onClick={() => handleSelectShipment(shipment)}
                  className={`w-full text-left p-4 rounded-[20px] border-2 transition-all ${
                    selectedShipment?.id === shipment.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-slate-200 bg-slate-50 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-sm">SHP-{shipment.id}</p>
                      <p className="text-xs text-slate-600 mt-1 truncate">{shipment.destination}</p>
                    </div>
                    {activeTab === 'received' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Package className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Shipment Details */}
          <div className="lg:col-span-2">
            {selectedShipment ? (
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className={`p-6 ${activeTab === 'received' ? 'bg-green-50' : 'bg-blue-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black">Shipment SHP-{selectedShipment.id}</h3>
                      <p className="text-sm font-medium mt-1">
                        {activeTab === 'received' ? 'Received' : 'In Transit - Awaiting Arrival'}
                      </p>
                    </div>
                    {activeTab === 'received' ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <Package className="w-8 h-8 text-blue-600" />
                    )}
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
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">To Warehouse</p>
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

                  {/* Temperature Rules */}
                  {selectedShipment.temp_rules && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-4 h-4 text-indigo-600" />
                        <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Temperature Requirements</p>
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        {typeof selectedShipment.temp_rules === 'object'
                          ? `${selectedShipment.temp_rules.min || '2'}°C - ${selectedShipment.temp_rules.max || '8'}°C`
                          : selectedShipment.temp_rules}
                      </p>
                    </div>
                  )}

                  {/* Sensor Data */}
                  {sensorData && sensorData.length > 0 && (
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Recent Readings</p>
                      <div className="space-y-2">
                        {sensorData.slice(0, 3).map((sensor, idx) => {
                          const tempStatus = getTemperatureStatus(sensor.temperature);
                          return (
                            <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
                              <div className="flex items-center gap-2">
                                <Thermometer className={`w-4 h-4 ${tempStatus.color}`} />
                                <span className="text-sm font-bold text-slate-800">{sensor.temperature}°C</span>
                              </div>
                              <span className={`text-xs font-bold ${tempStatus.color}`}>
                                {tempStatus.status === 'violation' ? 'VIOLATION' : 'OK'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    {activeTab === 'incoming' && (
                      <>
                        <button
                          onClick={() => setShowReceiveModal(true)}
                          className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-2xl hover:bg-indigo-700 transition-colors"
                        >
                          Receive Shipment
                        </button>
                      </>
                    )}
                    {activeTab === 'received' && (
                      <button
                        disabled
                        className="flex-1 bg-slate-200 text-slate-600 font-bold py-3 rounded-2xl cursor-not-allowed"
                      >
                        Already Received
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-[40px] border border-slate-200 p-12 text-center">
                <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 font-bold">Select a shipment to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {showReceiveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[40px] p-8 max-w-md w-full mx-4 space-y-6">
            <h3 className="text-2xl font-black text-slate-800">Receive Shipment SHP-{selectedShipment?.id}</h3>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Notes (Optional)</label>
              <textarea
                value={receiveNotes}
                onChange={(e) => setReceiveNotes(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-indigo-600"
                rows="4"
                placeholder="Add any notes about the shipment condition..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReceiveModal(false)}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReceiveShipment}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Confirm Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseReceiptTracking;
