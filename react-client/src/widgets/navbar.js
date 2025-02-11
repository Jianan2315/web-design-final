import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
    const navigate = useNavigate();

    // Check if the user is logged in and get the role
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Example: 'user' or 'admin'
    const isAuthenticated = !!token; // Boolean to check authentication

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userInfo');
        navigate('/'); // Redirect to home page
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Resume Builder</Link>
            </div>
            <div className="navbar-links">
                {!isAuthenticated ? (
                    <>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Log In</Link>
                    </>
                ) : (
                    <>
                        {userRole === 'user' && <Link to="/user">User Portal</Link>}
                        {userRole === 'user' && <Link to="/select">Templates</Link>}
                        {userRole === 'admin' && <Link to="/admin">Admin Portal</Link>}
                        <button className="logout-button" onClick={handleLogout}>
                            Log Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

