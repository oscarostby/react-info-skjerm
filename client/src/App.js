import React from 'react';
import { BrowserRouter, Route, Routes, Route as R } from 'react-router-dom'; // Import the new components
import Home from './content/main/main'; // Assuming this is where your main content resides
import Login from './content/login/login'; // Assuming this is where your main content resides
import Admin from './content/admin/admin'; // Assuming this is where your main content resides

function App() {
  return (
    <BrowserRouter>
      <Routes> {/* Use Routes instead of Switch */}
      <R path="/" element={<Home />} /> {/* Use Route with 'element' prop */}
        <R path="/login" element={<Login />} /> {/* Use Route with 'element' prop */}
        <R path="/Admin" element={<Admin />} /> {/* Use Route with 'element' prop */}

        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
