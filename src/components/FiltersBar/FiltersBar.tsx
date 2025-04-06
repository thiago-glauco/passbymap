import { Box, Grid, TextField } from '@mui/material';
import { usePlacesStore } from '../../store/usePlacesStore';
import { GeolocationRecord } from '@/types';

export const FiltersBar = () => {
  const { filters, setFilters } = usePlacesStore();

  const handleChange = (field: keyof GeolocationRecord, value: string) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const fields: (keyof GeolocationRecord)[] = [
    'name',
    'city',
    'region',
    'postal_code',
    'tenant_type',
    'longitude',
    'latitude',
  ];

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid size={{xs: 12, sm: 6, md: 3}} key={field}>
            <TextField
              fullWidth
              label={field.toString()}
              variant="outlined"
              value={filters[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FiltersBar;
