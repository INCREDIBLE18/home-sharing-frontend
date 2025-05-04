// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const Navbar = () => {
  // Get auth state and functions from the context
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogout = () => {
    logout(); // Call the logout function from context
    // Optional: Redirect user to home page after logout
    navigate('/');
    console.log('Logout handler called');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50"> {/* Added sticky top */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand Name */}
          <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition">
            HomeShare
          </Link>

          {/* Navigation Links - Updated with conditional rendering */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/listings"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Listings
            </Link>

            {/* Conditional Links based on login status */}
            {isLoggedIn ? (
              <>
                {/* Links for Logged In Users */}
                <Link
                  to="/add-listing" // We'll create this page later
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
                  title="Add New Listing"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   Add Listing
                </Link>
                <Link
                  to="/my-bookings" // We'll create this page later
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
                   title="My Bookings"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  My Bookings
                </Link>

                {/* Welcome message and Logout Button */}
                <span className="text-gray-700 text-sm hidden md:block"> {/* Hide on small screens */}
                  Welcome, {user?.name || 'User'}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Links for Logged Out Users */}
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;