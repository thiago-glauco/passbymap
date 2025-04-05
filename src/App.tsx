import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import { useGeospatialData } from './hooks/useGeolocationData';
import VirtualizedTenantsTable from './components/TenantsTable/VirtualizedTenantsTable'


const queryClient = new QueryClient();

const TableWrapper = ( ) => {
  const { data, isLoading, error } = useGeospatialData();
  if( isLoading ) return <div>Loading</div>
  if( error ) return <div>Error loading data</div>
  return (

      <VirtualizedTenantsTable tenantsData={data ?? []}/>

    )
}
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TableWrapper/>
      </QueryClientProvider>
    </>
  )
}

export default App
