import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@/components/ui';

function App() {
  
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Dashboard />
      <ToastProvider />

      </div>
    </BrowserRouter>
  );
}

export default App;
