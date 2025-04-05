/**
 * My intention here is to parse the records and sanityze then, so it will run like a real backend.
 */
import * as DOMPurify from 'dompurify';
import { GeolocationRecord } from "../types/GeolocationRecord";

/**
 * returns a sanitezed JSON like record.
 * @param csvFilePath 
 * @returns Promise<GeolocationRecord[]> 
 */
export const dataParse = async (csvFilePath: string): Promise<GeolocationRecord[]> => {
  const response = await fetch(csvFilePath);
  const csvText = await response.text();
  //const domPurify = DOMPurify.default

  console.log( "Csv is: ", csvText )

  const rows = csvText.split("\n").slice(1); // Skip first line - it is just a header

  return rows.map((row) => {
    console.log( "Getting csv: ", row )

    function normalizeRow( row: string ): string[] {
      let normalizedRow = ''
      if ( row.match('"') ) {
        const partialRow = row.split( /,"|",/ );
        return [...partialRow[0].split(','), partialRow[1], ...partialRow[2].split(',')]
      }
      return row.split(",");
    }
    
    const [pid, name, city, region, postal_code, tenant_type, longitude, latitude] = normalizeRow( row )
    
    return {
      pid: (DOMPurify as any).default.sanitize(pid),
      name:(DOMPurify as any).default.sanitize(name),
      city: (DOMPurify as any).default.sanitize(city),
      region: (DOMPurify as any).default.sanitize(region),
      postal_code: (DOMPurify as any).default.sanitize(postal_code),
      tenant_type: (DOMPurify as any).default.sanitize(tenant_type),
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    } as GeolocationRecord;
  });
};
