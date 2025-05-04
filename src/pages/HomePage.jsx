// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import HomeCard from '../components/HomeCard'; // Import the card component
import homesData from '../data/homes.json'; // Import the static JSON data

const HomePage = () => {
  // State to hold the listings for preview
  const [previewListings, setPreviewListings] = useState([]);

  // useEffect hook to load preview data when the component mounts
  useEffect(() => {
    // Simulate fetching data and take the first 3 listings for the preview
    setPreviewListings(homesData.slice(0, 3));
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {/* Welcome Section */}
      <div className="text-center p-6 md:p-10 mb-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Find Your Next Perfect Stay
        </h1>
        <p className="text-lg text-blue-100 mb-6">
          Browse unique homes shared by owners around the world (or at least, in our JSON file!).
        </p>
        <Link
           to="/listings"
           className="inline-block bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300 shadow"
        >
          Explore Homes
        </Link>
      </div>

      {/* Featured Homes Section */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Homes</h2>
      {previewListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Map over the preview listings and render a HomeCard for each */}
          {previewListings.map(home => (
            <HomeCard key={home.id} home={home} />
          ))}
        </div>
      ) : (
        // Show a loading/empty state if needed
        <p className="text-gray-500">Loading featured homes...</p>
      )}

      {/* Link to view all listings */}
      <div className="text-center mt-8">
        <Link
          to="/listings"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
        >
          View All Listings
        </Link>
      </div>
    </div>
  );
};

export default HomePage;