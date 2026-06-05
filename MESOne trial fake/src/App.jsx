import Login from './pages/PageLogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/PageDaskBoard";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;