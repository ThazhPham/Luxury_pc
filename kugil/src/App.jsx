import Login from './components/PageLogin';
import Dashboard from './components/PageDashboard';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;