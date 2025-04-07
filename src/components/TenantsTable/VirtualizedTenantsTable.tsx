import React, {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { GeolocationRecord } from '../../types/index';
import { usePlacesStore } from '../../store/usePlacesStore';

interface TenantTableColumns {
  dataKey: keyof GeolocationRecord;
  label: string;
  numeric?: boolean;
  width?: number;
}

interface VirtualizedTenantsTableProps {
  tenantsData: GeolocationRecord[]
}

const columns: TenantTableColumns[] = [
  {
    width: 100,
    label: 'PID',
    dataKey: 'pid',
  },
  {
    width: 100,
    label: 'Name',
    dataKey: 'name',
  },
  {
    width: 50,
    label: 'City',
    dataKey: 'city',
  },
  {
    width: 110,
    label: 'Region',
    dataKey: 'region',
  },
  {
    width: 130,
    label: 'Postal Code',
    dataKey: 'postal_code',
  },
  {
    width: 130,
    label: 'Tenant Type',
    dataKey: 'tenant_type',
  },
  {
    width: 130,
    label: 'Longitude',
    dataKey: 'longitude',
    numeric: true
  },
  {
    width: 130,
    label: 'Latitude',
    dataKey: 'latitude',
    numeric: true
  },
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
    <TableRow
      {...props}
      data-testid={item ? `tenant-row-${item.pid}` : undefined}
    />
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
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: GeolocationRecord) {
  return (
    <React.Fragment>
        {columns.map((column) => (
          
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
    </React.Fragment>
  );
}

const  VirtualizedTenantsTable:  FC = ( ) => {

  const { filteredPlaces } = usePlacesStore();
  return (
    <Paper style={{ height: 650, width: '100%' }}>
      <TableVirtuoso
        data={filteredPlaces}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default VirtualizedTenantsTable;


