import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { DataProvider } from './context/DataContext';

export default function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
      <Toaster />
    </DataProvider>
  );
}