import React, {FC, useMemo } from "react";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { GeolocationRecord } from "../../types/GeolocationRecord";



// Define customized components for react-virtuoso to “speak” Material UI.
// Note: For the header row we rely on our useMemo hook, so the header isn’t re‐created each render.
const VirtuosoTableComponents: TableComponents<GeolocationRecord> = {
    // Wrap the table in a Paper component so that it gets proper card styling and scrolling.
    Scroller: React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
        <Paper {...props} ref={ref} style={{ height: "100%", overflow: "auto" }} />
    )),
    Table: (props) => <Table {...props} />,
    TableHead,
    // Using function components here; you can wrap TableRow in React.memo if row rendering becomes heavy.
    TableRow: (props) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement, React.HTMLProps<HTMLTableSectionElement>>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

interface GeoDataTableProps {
    data: GeolocationRecord[];
}
    
const TenantsTable: React.FC<GeoDataTableProps> = ({ data }) => {

    // Memoize the header row so that it is not recreated on every render.
    const fixedHeaderContent = useMemo(
    () => (
    <TableRow>
    <TableCell>PID</TableCell>
    <TableCell>Name</TableCell>
    <TableCell>City</TableCell>
    <TableCell>Region</TableCell>
    <TableCell>Postal Code</TableCell>
    <TableCell>Tenant Type</TableCell>
    <TableCell>Longitude</TableCell>
    <TableCell>Latitude</TableCell>
    </TableRow>
    ),
    []
    );

    return (
        // <Paper style={{ height: "600px", width: "80%" }}>
            <TableVirtuoso
                data={data}
                components={VirtuosoTableComponents}
                fixedHeaderContent={() => fixedHeaderContent} // Always visible header (sticky)
                itemContent={(index, item) => (
                    <>
                        <TableCell>{item.pid}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.region}</TableCell>
                        <TableCell>{item.postal_code}</TableCell>
                        <TableCell>{item.tenant_type}</TableCell>
                        <TableCell>{item.longitude}</TableCell>
                        <TableCell>{item.latitude}</TableCell>
                    </>
                )}
            />
        //</Paper>
    );
};

export default TenantsTable;