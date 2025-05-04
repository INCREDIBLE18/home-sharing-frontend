// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import usersData from '../data/users.json'; // Import mock user data

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // To store basic user info (id, name, email)
  const [loading, setLoading] = useState(true); // To check initial auth status

  // Simulate checking auth status on initial load (e.g., from localStorage)
  // For now, we just assume the user is logged out initially.
  useEffect(() => {
    // --- Optional: Add localStorage persistence ---
    // const storedUser = localStorage.getItem('authUser');
    // if (storedUser) {
    //   const parsedUser = JSON.parse(storedUser);
    //   setUser(parsedUser);
    //   setIsLoggedIn(true);
    // }
    // --- End Optional ---

    setLoading(false); // Finished checking initial auth status
  }, []);

  // Mock Login Function
  const login = (email, password) => {
    // Find user in our mock data
    const foundUser = usersData.find(
      (u) => u.email === email && u.password === password // VERY INSECURE - Demo only!
    );

    if (foundUser) {
      const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userData);
      setIsLoggedIn(true);
      // Optional: localStorage.setItem('authUser', JSON.stringify(userData));
      return true; // Indicate successful login
    }
    // Handle failed login (e.g., show error message)
    console.error("Login failed: Invalid credentials");
    return false; // Indicate failed login
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // Optional: localStorage.removeItem('authUser');
    console.log("User logged out");
  };

  // The value provided to consuming components
  const value = {
    isLoggedIn,
    user,
    loading, // Provide loading state
    login, // Provide login function
    logout, // Provide logout function
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only after initial loading check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Create a Custom Hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};