import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import AuthProvider from './context/AuthContext';
import RootRoutes from './pages/RootRoutes';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
