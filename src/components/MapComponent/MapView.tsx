import { useState, useCallback } from 'react';
import Map, { NavigationControl, ViewStateChangeEvent  } from 'react-map-gl';

const MapView = () => {
  const [viewState, setViewState] = useState({
    latitude: 39.8283,
    longitude: -98.5795,
    zoom: 4,
    bearing: 0,
    pitch: 0
  });

  const handleMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  return (
    <Map
      {...viewState}
      onMove={handleMove}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      style={{ width: '100%', height: '100vh' }}
    >
      <NavigationControl position="top-left" />
    </Map>
  );
};

export default MapView;






