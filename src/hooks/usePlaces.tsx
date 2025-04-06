import { usePlacesStore } from '../store/usePlacesStore';

export const usePlaces = () => {
  const {
    filteredPlaces,
    filters,
    sortField,
    sortDirection,
    setFilters,
    setSort,
    applyFiltersAndSort,
  } = usePlacesStore();

  return {
    places: filteredPlaces,
    filters,
    sortField,
    sortDirection,
    setFilters,
    setSort,
    applyFiltersAndSort,
  };
};
