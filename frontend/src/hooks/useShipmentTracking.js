import { useState, useEffect, useCallback, useRef } from 'react';
import { useShipments } from '../context/ShipmentContext';
import TransporterService from '../transporter/TransporterService';
import WarehouseService from '../warehouse/WarehouseService';
import RetailerService from '../retailer/RetailerService';

export const useShipmentTracking = (shipmentId, _role = 'transporter') => {
  const { fetchShipment, error: _contextError } = useShipments();
  const [shipmentData, setShipmentData] = useState(null);
  const [_trackingData, _setTrackingData] = useState(null);
  const [sensorData, setSensorData] = useState([]);
  const [eta, setEta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const roleRef = useRef(_role);

  // Fetch shipment data based on role
  const loadShipmentData = useCallback(async () => {
    if (!shipmentId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let data = null;
      let sensors = [];
      const role = roleRef.current;

      if (role === 'transporter') {
        data = await TransporterService.getShipmentDetails(shipmentId);
        sensors = await TransporterService.getSensorData(shipmentId);
      } else if (role === 'warehouse') {
        data = await fetchShipment(shipmentId);
        sensors = await WarehouseService.getZoneSensorData(data?.id);
      } else if (role === 'retailer') {
        data = await RetailerService.scanShipment(shipmentId);
        sensors = await fetchShipment(shipmentId);
      }

      if (data) {
        setShipmentData(data);
        setSensorData(sensors || []);

        // Calculate ETA if we have origin and destination
        if (data.origin && data.destination && role === 'transporter') {
          const etaData = TransporterService.calculateETA(
            data.origin.lat || 0,
            data.origin.lng || 0,
            data.destination.lat || 0,
            data.destination.lng || 0
          );
          setEta(etaData);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load shipment data');
      console.error('Error loading shipment data:', err);
    } finally {
      setLoading(false);
    }
  }, [shipmentId, fetchShipment]);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      await loadShipmentData();
    };
    fetchData();
  }, [shipmentId, loadShipmentData]);

  // Set up polling for real-time updates
  useEffect(() => {
    if (!shipmentId) return;

    const interval = setInterval(async () => {
      await loadShipmentData();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [shipmentId, loadShipmentData]);

  // Refresh tracking data manually
  const refresh = useCallback(() => {
    return loadShipmentData();
  }, [loadShipmentData]);

  // Update shipment status
  const updateStatus = useCallback(async (newStatus, additionalData = {}) => {
    try {
      const role = roleRef.current;
      if (role === 'transporter') {
        if (newStatus === 'in_transit') {
          await TransporterService.acknowledgePickup(shipmentId);
        } else if (newStatus === 'delivered') {
          await TransporterService.reportDelivery(shipmentId, additionalData.signature, additionalData.notes);
        }
      } else if (role === 'warehouse') {
        if (newStatus === 'received') {
          await WarehouseService.receiveShipment(shipmentId, additionalData);
        }
      } else if (role === 'retailer') {
        if (newStatus === 'confirmed') {
          await RetailerService.confirmReceipt(shipmentId, additionalData);
        }
      }
      
      await loadShipmentData();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update status');
      return false;
    }
  }, [shipmentId, loadShipmentData]);

  // Report issue during transit
  const reportIssue = useCallback(async (issueType, description) => {
    try {
      const role = roleRef.current;
      if (role === 'transporter') {
        await TransporterService.reportIssue(shipmentId, issueType, description);
      } else if (role === 'warehouse') {
        await WarehouseService.reportQualityIssue(shipmentId, {
          description,
          severity: 'high',
        });
      }
      return true;
    } catch (err) {
      setError(err.message || 'Failed to report issue');
      return false;
    }
  }, [shipmentId]);

  return {
    shipmentData,
    trackingData: _trackingData,
    sensorData,
    eta,
    loading,
    error,
    refresh,
    updateStatus,
    reportIssue,
  };
};
