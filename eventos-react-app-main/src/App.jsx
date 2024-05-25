import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ClientsProvider } from './context/ClientsContext';
import { EventsProvider } from './context/EventsContext';
import { CotizacionesProvider } from './context/HistoryContext';

// Views
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Client from './views/Client';
import BuyHistory from './views/BuyHistory';
import BuyReports from './views/BuyReports';

function App() {
  return (
    <UserProvider>
      <ClientsProvider>
      <EventsProvider>
      <CotizacionesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/buy-history" element={<BuyHistory />} />
          <Route path="/buy-reports" element={<BuyReports />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      </CotizacionesProvider>
      </EventsProvider>
      </ClientsProvider>
    </UserProvider>
  );
}

export default App;
