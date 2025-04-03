// src/components/GeoList.tsx
import { useGeospatialData } from "../../hooks/useGeolocationData";
import CircularProgress from "@mui/material/CircularProgress";

const SillyTable = () => {
  const { data, isLoading, error } = useGeospatialData();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading data</div>;

  return (
    <ul>
      {data?.map((item) => (
        <li key={item.pid}>
          {item.name} - {item.city}, {item.region} ({item.latitude}, {item.longitude})
        </li>
      ))}
    </ul>
  );
};

export default SillyTable;
