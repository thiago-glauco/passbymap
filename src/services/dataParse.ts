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
    const [pid, name, city, region, postal_code, tenant_type, longitude, latitude] = row.split(",");

    return {
      pid: (DOMPurify as any).default.sanitize(pid.trim()),
      name:(DOMPurify as any).default.sanitize(name.trim()),
      city: (DOMPurify as any).default.sanitize(city.trim()),
      region: (DOMPurify as any).default.sanitize(region.trim()),
      postal_code: (DOMPurify as any).default.sanitize(postal_code.trim()),
      tenant_type: (DOMPurify as any).default.sanitize(tenant_type.trim()),
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    } as GeolocationRecord;
  });
};
