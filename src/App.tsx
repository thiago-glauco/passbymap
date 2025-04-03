import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SillyTable from './components/SiLlyTable/SillyTable';

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <QueryClientProvider client={queryClient}>
      <SillyTable />
      </QueryClientProvider>
    </>
  )
}

export default App
