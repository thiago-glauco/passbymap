import {FC, useEffect} from 'react';
import { Container, Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import FiltersBar from '../components/FiltersBar/FiltersBar';
import MapView from '../components/MapComponent/MapView';
import VirtualizedTenantsTable from '../components/TenantsTable/VirtualizedTenantsTable';

import { usePlacesStore } from '../store/usePlacesStore';
import { useGeospatialData } from '../hooks/useGeolocationData';

const Dashboard: FC = () => {
  const { data, isLoading, error } = useGeospatialData();
  const setPlaces = usePlacesStore((state) => state.setPlaces);
  const places = usePlacesStore((state) => state.places);

  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
  }, [data, setPlaces]);

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Typography color="error">Failed to load data: {error.message}</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Places Dashboard
      </Typography>

      <Box mb={2}>
        <FiltersBar />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{xs: 12, md: 12, lg: 12}}>
          <Paper sx={{ p: 2, height: 500 }}>
            <MapView />
          </Paper>
        </Grid>

        <Grid size={{xs: 12}}>
          <Paper sx={{ p: 2 }}>
            <VirtualizedTenantsTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;


