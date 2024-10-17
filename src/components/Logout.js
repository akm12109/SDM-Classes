import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Ensure this path is correct
import './css/Logout.css';

const Logout = () => {
  const { logout } = useAuth(); // Destructure logout and user from useAuth
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Handle navigation after popping state
  const handlePopState = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  // Logout function
  const handleLogout = useCallback(async () => {
    try {
      await logout(); // Call the logout function from auth context
      localStorage.removeItem('isLoggedIn'); // Clean up local storage
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false); // Update loading state
      navigate('/login'); // Navigate to login page
    }
  }, [logout, navigate]);

  // Effect to handle logout on mount
  useEffect(() => {
    handleLogout(); // Trigger logout

    // Prevent going back to the previous page
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState); // Cleanup event listener
    };
  }, [handleLogout, handlePopState]);

  return (
    <div className="logout-container">
      <div className="logout-box">
        {loading ? (
          <h1>Logging Out...</h1>
        ) : (
          <>
            <h1>Logged Out Successfully</h1>
            <p>You have been logged out. Please log in again to access your dashboard.</p>
            <div className="logout-buttons">
              <button className="login-btn" onClick={() => navigate('/login')}>Back to Login</button>
              <button className="home-btn" onClick={() => navigate('/')}>Back to Homepage</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Logout;
