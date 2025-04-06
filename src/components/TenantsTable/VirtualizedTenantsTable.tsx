import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

import { GeolocationRecord } from '@/types'; 
import { usePlacesStore } from '../../store/usePlacesStore'; // corrected path

interface TenantTableColumns {
  dataKey: keyof GeolocationRecord;
  label: string;
  numeric?: boolean;
  width?: number;
}

const columns: TenantTableColumns[] = [
  { width: 100, label: 'PID', dataKey: 'pid' },
  { width: 150, label: 'Name', dataKey: 'name' },
  { width: 100, label: 'City', dataKey: 'city' },
  { width: 110, label: 'Region', dataKey: 'region' },
  { width: 130, label: 'Postal Code', dataKey: 'postal_code' },
  { width: 130, label: 'Tenant Type', dataKey: 'tenant_type' },
  { width: 130, label: 'Longitude', dataKey: 'longitude', numeric: true },
  { width: 130, label: 'Latitude', dataKey: 'latitude', numeric: true },
];

const VirtuosoTableComponents: TableComponents<GeolocationRecord> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow: ({ item, ...props }) => (
    <TableRow {...props} data-testid={item ? `tenant-row-${item.pid}` : undefined} />
  ),
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper', cursor: 'default' }} // add cursor:pointer if sorting
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: GeolocationRecord) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

const VirtualizedTenantsTable: FC = () => {
  const tenantsData = usePlacesStore((state) => state.filteredPlaces);

  return (
    <Paper style={{ height: 650, width: '100%' }}>
      <TableVirtuoso
        data={tenantsData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default VirtualizedTenantsTable;


