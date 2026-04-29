import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiClient } from '../api/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {
  const [shipments, setShipments] = useState([]);
  const [activeShipment, setActiveShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState(null);
  const [liveTracking, setLiveTracking] = useState({});

  // Fetch all shipments
  const fetchShipments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(API_ENDPOINTS.SHIPMENTS);
      if (response.success) {
        setShipments(response.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch shipments');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single shipment
  const fetchShipment = useCallback(async (shipmentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}`);
      if (response.success) {
        setActiveShipment(response.data);
        return response.data;
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch shipment');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update shipment status
  const updateShipmentStatus = useCallback(async (shipmentId, status) => {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/status`, { status });
      if (response.success) {
        const previousShipments = shipments;
        const nextShipments = previousShipments.map(s => s.id === shipmentId ? { ...s, status } : s);
        const updatedShipment = nextShipments.find(s => s.id === shipmentId) || null;

        setShipments(nextShipments);
        setActiveShipment(prev => {
          if (prev?.id === shipmentId) {
            return { ...prev, status };
          }
          return prev;
        });

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('shipment:updated', {
            detail: {
              shipmentId,
              status,
              shipment: updatedShipment,
              previousStatus: previousShipments.find(s => s.id === shipmentId)?.status,
            },
          }));
        }

        return response.data;
      }
    } catch (err) {
      setError(err.message || 'Failed to update shipment status');
      throw err;
    }
  }, [shipments]);

  // Set live tracking data for a shipment
  const setShipmentTracking = useCallback((shipmentId, trackingData) => {
    setLiveTracking(prev => {
      const nextTracking = {
        ...prev,
        [shipmentId]: {
          ...prev[shipmentId],
          ...trackingData,
          lastUpdated: new Date().toISOString(),
        },
      };

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('shipment:tracking-updated', {
          detail: {
            shipmentId,
            trackingData: nextTracking[shipmentId],
          },
        }));
      }

      return nextTracking;
    });
  }, []);

  // Get live tracking data for a shipment
  const getShipmentTracking = useCallback((shipmentId) => {
    return liveTracking[shipmentId] || null;
  }, [liveTracking]);

  // Calculate ETA based on distance and average speed
  const calculateETA = useCallback((distance, speed = 60) => {
    if (!distance) return null;
    const hours = distance / speed;
    const now = new Date();
    return new Date(now.getTime() + hours * 60 * 60 * 1000);
  }, []);

  // Get shipments by role
  const getShipmentsByRole = useCallback((_role) => {
    // Filter shipments based on role
    // For now, return all shipments and let the component handle role-specific filtering
    return shipments;
  }, [shipments]);

  // Get shipments by status
  const getShipmentsByStatus = useCallback((status) => {
    return shipments.filter(s => s.status === status);
  }, [shipments]);

  const value = {
    // State
    shipments,
    activeShipment,
    loading,
    error: _error,
    liveTracking,
    
    // Methods
    fetchShipments,
    fetchShipment,
    updateShipmentStatus,
    setShipmentTracking,
    getShipmentTracking,
    calculateETA,
    getShipmentsByRole,
    getShipmentsByStatus,
  };

  return (
    <ShipmentContext.Provider value={value}>
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipments = () => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error('useShipments must be used within ShipmentProvider');
  }
  return context;
};
