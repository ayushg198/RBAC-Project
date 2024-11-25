import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';  // Import the toast and Toaster


import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // mock data
      if (email === 'user@gmail.com' && password === '12345') {
        login({ email, role: 'user' });
        navigate('/dashboard');
      } else if (email === 'admin@gmail.com' && password === '12345') {
        login({ email, role: 'admin' });
        navigate('/admin');
      } else if (email === 'sub@gmail.com' && password === '12345') {
        login({ email, role: 'subordinate' });
        navigate('/subordinate');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    toast(`Welcome to the Login Page!
      admin-admin@gmail.com, password-12345
      user-user@gmail.com, password-12345
      subordinate-sub@gmail.com, password-12345`,{ id: 'login-toast',duration:50000 });
  }, []);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
