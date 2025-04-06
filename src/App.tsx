import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import { useGeospatialData } from './hooks/useGeolocationData';
import VirtualizedTenantsTable from './components/TenantsTable/VirtualizedTenantsTable'
import MapView from './components/MapComponent/MapView'
import 'mapbox-gl/dist/mapbox-gl.css';

const queryClient = new QueryClient();

const TableWrapper = ( ) => {
  const { data, isLoading, error } = useGeospatialData();
  if( isLoading ) return <div>Loading</div>
  if( error ) return <div>Error loading data</div>
  return (

      <VirtualizedTenantsTable tenantsData={data ?? []}/>

    )
}

const MapWrapper = ( ) => {
  const { data, isLoading, error } = useGeospatialData();
  if( isLoading ) return <>Loading Map</>
  if ( data ) 
    return(
        
        <MapView data={data} />
      )
}
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <MapWrapper />
        {/*<TableWrapper/>*/}
      </QueryClientProvider>
    </>
  )
}

export default App
