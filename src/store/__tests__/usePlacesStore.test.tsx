import { act } from 'react';
import { usePlacesStore } from '../usePlacesStore';
import { GeolocationRecord } from '../../types';

const mockPlaces: GeolocationRecord[] = [
  {
    pid: '1',
    name: 'Harbor Freight Tools',
    city: 'Albuquerque',
    region: 'NM',
    postal_code: '87105',
    tenant_type: 'Furniture & Home',
    longitude: -106.68774,
    latitude: 35.084217,
  },
  {
    pid: '2',
    name: 'Phillips 66',
    city: 'St. Joseph',
    region: 'MO',
    postal_code: '64506',
    tenant_type: 'Gas Station',
    longitude: -94.814156,
    latitude: 39.80714,
  },
];

describe('Places Store', () => {
  beforeEach(() => {
    usePlacesStore.setState({
      places: [],
      filteredPlaces: [],
      filters: {},
      sortField: null,
      sortDirection: 'asc',
    });
  });

  it('should set places correctly', () => {
    act(() => {
      usePlacesStore.getState().setPlaces(mockPlaces);
    });

    const { places, filteredPlaces } = usePlacesStore.getState();
    expect(places).toEqual(mockPlaces);
    expect(filteredPlaces).toEqual(mockPlaces);
  });

  it('should apply filters correctly', () => {
    act(() => {
      usePlacesStore.getState().setPlaces(mockPlaces);
      usePlacesStore.getState().setFilters({ city: 'Albu' });
      usePlacesStore.getState().applyFiltersAndSort();
    });

    const { filteredPlaces } = usePlacesStore.getState();
    expect(filteredPlaces.length).toBe(1);
    expect(filteredPlaces[0].city).toBe('Albuquerque');
  });

  it('should apply sort correctly', () => {
    act(() => {
      usePlacesStore.getState().setPlaces(mockPlaces);
      usePlacesStore.getState().setSort('name', 'desc');
      usePlacesStore.getState().applyFiltersAndSort();
    });

    const { filteredPlaces } = usePlacesStore.getState();
    expect(filteredPlaces[0].name).toBe('Phillips 66'); // because "P" after "H"
  });

  it('should filter and sort together', () => {
    act(() => {
      usePlacesStore.getState().setPlaces(mockPlaces);
      usePlacesStore.getState().setFilters({ region: 'MO' });
      usePlacesStore.getState().setSort('name', 'asc');
      usePlacesStore.getState().applyFiltersAndSort();
    });

    const { filteredPlaces } = usePlacesStore.getState();
    expect(filteredPlaces.length).toBe(1);
    expect(filteredPlaces[0].region).toBe('MO');
    expect(filteredPlaces[0].name).toBe('Phillips 66');
  });
});
