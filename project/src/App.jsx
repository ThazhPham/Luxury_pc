import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  // Load session khi refresh
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login
  const handleLogin = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  }

  // Update user data when profile is edited in DataGrid
  const handleUserUpdate = (updatedUserData) => {
    sessionStorage.setItem('user', JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  }

  return (
    <>
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <MainPage user={user} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />
      )}
    </>
  )
}

export default App
