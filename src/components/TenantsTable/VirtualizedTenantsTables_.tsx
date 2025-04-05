import {forwardRef, FC} from "react";
import { TableVirtuoso } from "react-virtuoso";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import {GeolocationRecord} from '../../types/GeolocationRecord'


// Generate mock data
const generateData = (count: number): GeolocationRecord[] => {
  return Array.from({ length: count }, (_, i) => ({
    pid: `${i + 1}`,
    name: `Store ${i + 1}`,
    city: `City ${i + 1}`,
    region: `region ${i}`,
    postal_code: `1000${i}`,
    tenant_type: `Type ${i}`,
    latitude: 40.7128 + Math.random() * 0.1,
    longitude: -74.006 + Math.random() * 0.1,
  }));
};

const data = generateData(10000);

const VirtualizedTenantsTables: FC = () => {
  return (
    <TableContainer component={Paper}   style={{
      height: "500px",
      overflow: "auto",
      scrollbarGutter: "stable", // Prevents content shift
    }}>
      <Table stickyHeader>
        {/* TableVirtuoso handles the body, so we only provide headers here */}
        <TableHead>
          <TableRow>
            <TableCell>PID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      {/* TableVirtuoso must be outside <TableBody> */}
      <TableVirtuoso
        data={data}
        style={{ height: "100%" }}
        initialTopMostItemIndex={0}
        components={{
          Table: (props) => <Table {...props} />,
          TableRow: (props) => <TableRow {...props} />,
          TableBody: forwardRef((props, ref) => <tbody ref={ref} {...props} />),
        }}
        itemContent={(index, item) => (
          <>
            <TableCell>{item.pid}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.city}</TableCell>
            <TableCell>{item.region}</TableCell>
            <TableCell>{item.postal_code}</TableCell>
            <TableCell>{item.latitude.toFixed(5)}</TableCell>
            <TableCell>{item.longitude.toFixed(5)}</TableCell>
          </>
        )}
      />
    </TableContainer>
  );
};

export default VirtualizedTenantsTables;


