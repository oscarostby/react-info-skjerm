// AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: red;
  color: white;
  border-radius: 5px;
  z-index: 9999; 
`;

const AuthForm = ({ endpoint, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onSuccess();
    } catch (error) {
      console.error(error);
      setError("Hva driver du med?? Prøver du å hacke deg inn? Hvis ikke så trykk på boxen og prøv igjen."); // Set error message
    }
  };

  const handleCloseError = () => {
    setError(null); // Clear error message
  };

  return (
    <div>
      {error && (
        <ErrorContainer onClick={handleCloseError}>
          {error}
        </ErrorContainer>
      )}
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
