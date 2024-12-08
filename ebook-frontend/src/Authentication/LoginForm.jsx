import React, { useState } from 'react';
import './LoginForm.css';
import { FaLock, FaUser } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // for navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('https://jhsgtpawuf.execute-api.eu-north-1.amazonaws.com/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        // Successful login, store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
  
        // Redirect to HomePage
        navigate('/HomePage');
      } else {
        // Error message from Lambda
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          {error && <div className="error">{error}</div>}

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account? <NavLink to="/RegisterForm"> Register </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
