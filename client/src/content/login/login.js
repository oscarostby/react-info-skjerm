// App.js
import React from 'react';
import AuthForm from '../../AuthForm';
import './login.css'; // Import the styles
import styled from 'styled-components';




function App() {
  
  const handleSuccess = () => {
    console.log('Authentication successful!');
    window.location.href = "/admin";
  };



  return (

    <div className="bg22">
      <div className="login-box2">
        <div className="logotext2">
          <h1>Login</h1>
        </div>
        <AuthForm endpoint="login" onSuccess={handleSuccess} />
      </div>
    </div>

  );
  
}

export default App;
