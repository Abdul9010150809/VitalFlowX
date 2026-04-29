/**
 * Time Estimation and ETA Calculation Utilities
 * Provides functions for calculating estimated arrival times and distance-based predictions
 */

// Haversine formula to calculate distance between two coordinates
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Calculate ETA based on distance and average speed
export const calculateETA = (
  currentLat,
  currentLng,
  destLat,
  destLng,
  avgSpeed = 60,
  currentTime = new Date()
) => {
  const distance = calculateDistance(currentLat, currentLng, destLat, destLng);
  const hours = distance / avgSpeed;
  const minutes = (hours % 1) * 60;
  const eta = new Date(currentTime.getTime() + hours * 60 * 60 * 1000);

  return {
    distance: parseFloat(distance.toFixed(2)),
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    eta,
    formattedETA: eta.toLocaleString(),
    timeRemaining: `${Math.floor(hours)}h ${Math.floor(minutes)}m`,
  };
};

// Estimate delivery time based on shipment status and location
export const estimateDeliveryTime = (shipment, currentLocation) => {
  if (!shipment || !currentLocation) return null;

  let destLat, destLng;

  // Parse destination coordinates
  if (shipment.destination) {
    if (typeof shipment.destination === 'object') {
      destLat = shipment.destination.lat;
      destLng = shipment.destination.lng;
    } else if (typeof shipment.destination === 'string') {
      const [lat, lng] = shipment.destination.split(',').map(x => parseFloat(x.trim()));
      destLat = lat;
      destLng = lng;
    }
  }

  if (!destLat || !destLng) return null;

  // Get average speed based on shipment type or route type
  let avgSpeed = 60; // Default: 60 km/h
  if (shipment.transportMode === 'air') avgSpeed = 800;
  else if (shipment.transportMode === 'sea') avgSpeed = 40;
  else if (shipment.transportMode === 'truck') avgSpeed = 80;
  else if (shipment.transportMode === 'rail') avgSpeed = 100;

  return calculateETA(
    currentLocation.lat,
    currentLocation.lng,
    destLat,
    destLng,
    avgSpeed
  );
};

// Format time remaining in human-readable format
export const formatTimeRemaining = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

// Get ETA status color based on time remaining
export const getETAStatusColor = (eta) => {
  if (!eta) return 'gray';
  
  const now = new Date();
  const timeRemaining = eta.getTime() - now.getTime();
  const hoursRemaining = timeRemaining / (1000 * 60 * 60);

  if (hoursRemaining < 1) return 'red'; // Less than 1 hour - urgent
  if (hoursRemaining < 4) return 'orange'; // Less than 4 hours - warning
  return 'green'; // More than 4 hours - good
};

// Predict delays based on historical data or current conditions
export const predictDelay = (shipment, currentLocation, weather = null) => {
  if (!shipment || !currentLocation) return null;

  let delayFactor = 1.0; // Base: no delay

  // Factor in weather conditions
  if (weather) {
    if (weather.conditions === 'rain') delayFactor += 0.15;
    if (weather.conditions === 'snow') delayFactor += 0.30;
    if (weather.conditions === 'heavy traffic') delayFactor += 0.20;
  }

  // Factor in shipment type (perishable items may need more careful handling)
  if (shipment.isPerishable) delayFactor += 0.10;

  // Factor in time of day (rush hour delays)
  const hour = new Date().getHours();
  if ((hour >= 7 && hour <= 10) || (hour >= 17 && hour <= 19)) {
    delayFactor += 0.15;
  }

  return {
    delayFactor,
    estimatedDelayHours: (delayFactor - 1) * 24, // Approximate hours of delay
  };
};

// Calculate actual speed based on historical tracking data
export const calculateActualSpeed = (trackingHistory) => {
  if (!trackingHistory || trackingHistory.length < 2) return null;

  let totalDistance = 0;
  let totalTime = 0;

  for (let i = 1; i < trackingHistory.length; i++) {
    const prev = trackingHistory[i - 1];
    const current = trackingHistory[i];

    const distance = calculateDistance(
      prev.latitude,
      prev.longitude,
      current.latitude,
      current.longitude
    );
    totalDistance += distance;

    const timeDiff = new Date(current.timestamp) - new Date(prev.timestamp);
    totalTime += timeDiff;
  }

  const hours = totalTime / (1000 * 60 * 60);
  return hours > 0 ? totalDistance / hours : 0;
};

// Get ETA confidence level based on data quality
export const getETAConfidence = (trackingDataPoints, totalExpectedPoints) => {
  if (!trackingDataPoints || !totalExpectedPoints) return 0;
  
  const confidence = (trackingDataPoints / totalExpectedPoints) * 100;
  return Math.min(confidence, 100); // Cap at 100%
};
