/**
 * To lead in the future: use maplibre in dev and mapbox in prod.
 */
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const MAP_STYLE = MAPBOX_TOKEN
  ? 'mapbox://styles/mapbox/streets-v11'
  : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export const mapLib = MAPBOX_TOKEN
  ? undefined // It will auto use mapbox-gl
  : await import('maplibre-gl'); // Dynamic Import for dev (no request cost)

export { MAPBOX_TOKEN };
