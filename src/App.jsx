// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout and Page Components
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
// --- Import Protected Route and Pages ---
import ProtectedRoute from './components/ProtectedRoute';
import AddListingPage from './pages/AddListingPage';
import MyBookingsPage from './pages/MyBookingsPage';
// --- End Imports ---

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes using the Layout */}
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="listings/:id" element={<ListingDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* --- Protected Routes --- */}
          {/* Wrap protected routes in an element using ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            {/* Routes nested inside here will require login */}
            <Route path="add-listing" element={<AddListingPage />} />
            <Route path="my-bookings" element={<MyBookingsPage />} />
            {/* Add more protected routes here if needed */}
          </Route>
          {/* --- End Protected Routes --- */}

          {/* Catch-all 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Routes outside the main Layout could go here */}

      </Routes>
    </Router>
  );
}

export default App;