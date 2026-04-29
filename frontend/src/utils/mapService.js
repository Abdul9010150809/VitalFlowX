export const fetchRoute = async (startCoords, endCoords) => {
  const apiKey = import.meta.env.VITE_OPENROUTESERVICE_KEY;
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
  const body = {
    coordinates: [
      [startCoords[1], startCoords[0]], // lon, lat
      [endCoords[1], endCoords[0]]
    ]
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouteService error: ${response.status} ${err}`);
  }
  return await response.json();
};
