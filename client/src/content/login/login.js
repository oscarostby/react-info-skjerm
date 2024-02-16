import React from 'react';
import AuthForm from '../../AuthForm';
import './login.css'; // Import the styles

const Login = () => {
  const handleSuccess = () => {
    console.log('Authentication successful!');
    
    // Set the "admin" cookie upon successful login
    document.cookie = "admin=true;path=/";
    
    // Redirect to the admin page
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
};

export default Login;
