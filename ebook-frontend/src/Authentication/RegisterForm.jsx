import React, { useState } from 'react';
import './RegisterForm.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('https://41hgrm82qh.execute-api.eu-north-1.amazonaws.com/prod/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName, // Send userName instead
                Email: email,
                Password: password,
            }),
        });

        const data = await response.json();

        if (response.status === 201) {
            setMessage(data.message); // Success message
            setUserName(''); // Clear the username field
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // Redirect to LoginForm after successful signup
            navigate('/LoginForm'); // Redirect to LoginForm
        } else {
            setError(data.message || 'An error occurred.');
        }
    } catch (err) {
        setError('Failed to connect to the server. Please try again.');
        console.error('Error:', err);
    }
};


  return (
    <div className="register-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          {error && <div className="error">{error}</div>}
          {message && <div className="message">{message}</div>}

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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className="icon" />
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
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Register</button>

          <div className="login-link">
            <p>
              Already have an account? <NavLink to="/LoginForm"> Login </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;