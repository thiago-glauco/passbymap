// src/components/MapView.tsx

import { useState, useMemo } from 'react';
import ReactMapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { GeolocationRecord } from '../../types/GeolocationRecord';
import Map, { MapProvider, NavigationControl, Popup } from 'react-map-gl';


const MapView = ({ data }: { data: GeolocationRecord[] }) => {
  const [viewState, setViewState] = useState({
    latitude: 39.8283,
    longitude: -98.5795,
    zoom: 4,
    bearing: 0,
    pitch: 0,
  });
  const [selectedPlace, setSelectedPlace] = useState<GeolocationRecord|null>(null);
  const layers = useMemo(() => [
    new ScatterplotLayer<GeolocationRecord>({
      id: 'places',
      data,
      pickable: true,
      getPosition: (d) => [d.longitude, d.latitude],
      getRadius: 20000,
      getFillColor: [255, 99, 71, 180], // Tomato Color
      onClick: info => {
        if (info.object) setSelectedPlace(info.object);
      },
    }),
  ], [data]);

  
 return(
  <MapProvider>
  <DeckGL
    initialViewState={{
      latitude: 39.8283,
      longitude: -98.5795,
      zoom: 4,
    }}
    controller={true}
    layers={layers}
  >
    <Map
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      style={{ width: '100%', height: '100vh' }}
    >
      <NavigationControl position="top-left" />

      {selectedPlace && (
        <Popup
          longitude={selectedPlace.longitude}
          latitude={selectedPlace.latitude}
          onClose={() => setSelectedPlace(null)}
          closeButton={true}
          closeOnClick={false}
          anchor="top"
        >
          <div>
            <strong>{selectedPlace.name}</strong>
            <br />
            {selectedPlace.city}, {selectedPlace.region}
          </div>
        </Popup>
      )}
    </Map>
  </DeckGL>
</MapProvider>
  );
};

export default MapView;
