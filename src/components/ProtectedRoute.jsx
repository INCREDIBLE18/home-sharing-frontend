// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth(); // Get login status and loading state
  const location = useLocation(); // Get current location to redirect back after login

  // 1. Show loading indicator while checking auth status
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div>Loading authentication status...</div>
      </div>
    );
  }

  // 2. If not loading and user is not logged in, redirect to login page
  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
    // 'replace' avoids adding the protected route path to history when redirected
  }

  // 3. If user is logged in, render the child route content
  // <Outlet /> renders the nested route defined in App.jsx (e.g., AddListingPage)
  return <Outlet />;
};

export default ProtectedRoute;