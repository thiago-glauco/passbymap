import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import VirtualizedTenantsTable from "../VirtualizedTenantsTable";
import { GeolocationRecord } from "../../../types/GeolocationRecord";

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

const tableRows = generateData( 100 )

/**
 * In the happy path, this table must render. I'm just checking headers here because Jest is not ideal for virtualized tests.
 * Performance, component loading and scrolling are in Cypress tests.
 * 
 */
describe("VirtualizedTenantsTable Component basic tests", () => {
  it("renders a table with headers", () => {
    render(<VirtualizedTenantsTable tenantsData={tableRows}/>);

    // Check if column headers exist
    expect(screen.queryByText("PID")).toBeInTheDocument();
    expect(screen.queryByText("Name")).toBeInTheDocument();
    expect(screen.queryByText("City")).toBeInTheDocument();
    expect(screen.queryByText("Region")).toBeInTheDocument();
    expect(screen.queryByText("Postal Code")).toBeInTheDocument();
    expect(screen.queryByText("Tenant Type")).toBeInTheDocument();
    expect(screen.queryByText("Latitude")).toBeInTheDocument();
    expect(screen.queryByText("Longitude")).toBeInTheDocument();
  });
});
