
export interface GeolocationRecord {
    pid: string; // uuid
    name: string; 
    city: string; 
    region: string; 
    postal_code: string;
    tenant_type: string; //(e.g., Furniture & Home or Quick Serve Restaurants)
    longitude: number;
    latitude: number;
  }
  