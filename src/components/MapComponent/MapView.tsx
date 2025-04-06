import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { usePlacesStore } from '../../store/usePlacesStore';
import { GeolocationRecord } from '@/types';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const INITIAL_VIEW_STATE = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 3,
};

export const MapView = () => {
  const { filteredPlaces } = usePlacesStore();
  const [selectedPlace, setSelectedPlace] = useState<GeolocationRecord | null>(null);

  const layers = [
    new ScatterplotLayer({
      id: 'places-layer',
      data: filteredPlaces,
      pickable: true,
      getPosition: (d: GeolocationRecord) => [Number(d.longitude), Number(d.latitude)],
      getFillColor: [255, 0, 0, 150],
      getRadius: 50000,
      onClick: (info) => {
        if (info.object) {
          setSelectedPlace(info.object as GeolocationRecord);
        }
      },
    }),
  ];
  
  

  return (
    <Box height="500px" position="relative">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        />

        {selectedPlace && (
          <Box
            position="absolute"
            left={10}
            bottom={10}
            bgcolor="white"
            p={1}
            borderRadius={1}
            boxShadow={3}
          >
            <div>{selectedPlace.name}</div>
            <div>{selectedPlace.city}, {selectedPlace.region}</div>
            <button onClick={() => setSelectedPlace(null)}>Close</button>
          </Box>
        )}

      </DeckGL>
    </Box>
  );
};

export default MapView;


