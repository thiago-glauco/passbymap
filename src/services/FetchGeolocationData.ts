
import { dataParse } from "./dataParse";
import { GeolocationRecord } from "../types";
import { Errors } from "./ServiceMessages";


/**
 * retrieves server data
 * @returns Promise<GeolocationRecord[]>
 */

export const fetchGeolocationData = async (): Promise<GeolocationRecord[]> => {
  try {
    const csvFilePath = "/result.csv"; // Path to your CSV file in assets folder
    console.log( csvFilePath )
    return await dataParse(csvFilePath);
  } catch ( e ) {
    if (process.env.NODE_ENV === 'development') {
        console.log('error retrieving data: ', e);
      }
    throw new Error(Errors.dataLoading);
      
  }
};
