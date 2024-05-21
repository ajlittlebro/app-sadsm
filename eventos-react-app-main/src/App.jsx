import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// Views
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Client from './views/Client';
import BuyHistory from './views/BuyHistory';
import BuyReports from './views/BuyReports';

function App() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
