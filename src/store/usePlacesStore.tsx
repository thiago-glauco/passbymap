import { create } from 'zustand';
import { GeolocationRecord, Filters, PlacesStore } from '@/types';

export const usePlacesStore = create<PlacesStore>((set, get) => ({
  places: [],
  filteredPlaces: [],
  filters: {},
  sortField: 'name', // default safe field
  sortDirection: 'asc', // 'asc' | 'desc'

  setPlaces: (places: GeolocationRecord[]) => {
    set(() => ({ places }));
    get().applyFiltersAndSort();
  },

  setFilters: (filters: Filters) => {
    set(() => ({ filters }));
    get().applyFiltersAndSort();
  },

  setSort: (field: keyof GeolocationRecord) => {
    const { sortField, sortDirection } = get();
    const nextDirection =
      sortField === field
        ? (sortDirection === 'asc' ? 'desc' : 'asc')
        : 'asc';

    set(() => ({
      sortField: field,
      sortDirection: nextDirection,
    }));

    get().applyFiltersAndSort();
  },

  applyFiltersAndSort: () => {
    const { places, filters, sortField, sortDirection } = get();
  
    const filtered = places.filter((place) => {
      return Object.entries(filters).every(([key, value]) => {
        return place[key as keyof GeolocationRecord]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    });
  
    let sorted = [...filtered];
    if (sortField) {
      sorted = sorted.sort((a, b) => {
        const aValue = a[sortField] ?? '';
        const bValue = b[sortField] ?? '';
    
        return sortDirection === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }
  
    set({ filteredPlaces: sorted });
  },
  
  
}));

