// Memoized GeoListItem.tsx
import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { memo } from 'react';
import { GeolocationRecord } from '../../types';

const GeoListItem = memo(({ item }: { item: GeolocationRecord }) => (
  <ListItem>
    <ListItemText 
      primary={item.name}  // Custom sanitized component
      secondary={`${item.city} (${item.latitude}, ${item.longitude})`}
    />
    <IconButton edge="end">
      <LocationOnIcon />
    </IconButton>
  </ListItem>
));
