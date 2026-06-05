import { useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (username.trim() === '' && password.trim() === '') {
      setError('Please fill in all fields');
      return;
    }
    if (!username || username.trim() === '') {
      setError('Please check your username');
      return;
    }
    if (!password || password.trim() === '') {
      setError('Please check your password');
      return;
    }

    // Password check (simple demo: password = 123)
    if (password !== '123') {
      setError('Invalid password. Try password: 123');
      return;
    }

    // Login via API - find user by username in Supabase
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/login', { username: username.trim() });
      alert('Login successful!');
      onLogin(res.data);
    } catch (err) {
      setError('Invalid username. User not found in database.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>ISC System</h1>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}


          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="login-hint">
            <p><strong>Demo credentials:</strong></p>
            <p>Username: (any user in database) | Password: 123</p>
          </div>
        </form>
      </div>
    </div>
  );
}


export default LoginPage;
