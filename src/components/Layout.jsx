// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import { Outlet } from 'react-router-dom'; // Import Outlet to render nested routes

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Render the Navbar */}
      <Navbar />

      {/* Main content area where routed pages will be displayed */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> {/* Child route components render here */}
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-200 text-center p-4 mt-auto text-sm text-gray-600">
        © 2025 HomeShare Platform. Created in Nagpur.
      </footer>
    </div>
  );
};

export default Layout;