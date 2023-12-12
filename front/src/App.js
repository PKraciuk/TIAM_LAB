import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Data from './Data';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in when the app loads
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogin = (status) => {
        // Update local storage and state
        localStorage.setItem('isLoggedIn', status);
        setIsLoggedIn(status);
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} onLogout={() => handleLogin(false)} />
            <div className="main-content">
                <Routes>
                    <Route path="/login" element={<Login onLoginSuccess={() => handleLogin(true)} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/data" element={<Data />} />
                    {/* Add other routes here */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
