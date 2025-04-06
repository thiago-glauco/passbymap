
export interface GeolocationRecord {
    pid: string;
    name: string; 
    city: string; 
    region: string; 
    postal_code: string;
    tenant_type: string;
    longitude: number;
    latitude: number;
  }

export interface PlacesStore {
  places: GeolocationRecord[];
  filters: Filters;
  sortField: keyof GeolocationRecord | null;
  sortDirection: SortDirection;
  filteredPlaces: GeolocationRecord[];

  setPlaces: (places: GeolocationRecord[]) => void;
  setFilters: (filters: Filters) => void;
  setSort: (field: keyof GeolocationRecord) => void;
  applyFiltersAndSort: () => void;
}

  // For filtering — dynamic keys from Place
  export type Filters = Partial<Record<keyof GeolocationRecord, string>>;

  // Sorting Direction
  export type SortDirection = 'asc' | 'desc';
  
  // Columns for Table / Filters / Generic Listing
  export interface ColumnConfig {
    key: keyof GeolocationRecord;
    label: string;
  }
  