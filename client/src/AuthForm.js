// AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ endpoint, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in localStorage (you may use more secure methods)
      onSuccess(); // Callback to handle success, e.g., redirecting to another page
    } catch (error) {
      console.error(error);
      alert("Error with your login credentials, please try again.");
      // Handle authentication error (display error message, etc.)
    }
  };

  return (
    <div>
      <h2>{endpoint === 'Skal ikke ha noe ' ? 'her' : ''}</h2>
      <div>
        <label>Username: </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleAuth}>{endpoint === 'register' ? 'Register' : 'Login'}</button>
      </div>
    </div>
  );
};

export default AuthForm;
