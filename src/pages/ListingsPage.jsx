// src/pages/ListingsPage.jsx
import React, { useState, useEffect } from 'react';
import HomeCard from '../components/HomeCard'; // Import the card component
import homesData from '../data/homes.json'; // Import the static JSON data

const ListingsPage = () => {
  // State to hold the listings data
  const [listings, setListings] = useState([]);
  // State to manage loading status (optional but good practice)
  const [loading, setLoading] = useState(true);

  // useEffect hook to load data when the component mounts
  useEffect(() => {
    // Simulate fetching data from our JSON file
    // In a real app, this would be an API call: e.g., fetch('/api/homes')
    setListings(homesData);
    setLoading(false); // Set loading to false after data is set
  }, []); // The empty dependency array [] means this effect runs only once after initial render

  // Display a loading message while data is being "fetched"
  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading listings...</div>;
  }

  // Render the page content once data is loaded
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Homes</h1>

      {/* Check if there are any listings */}
      {listings.length === 0 ? (
        <p className="text-gray-600">No listings available at the moment.</p>
      ) : (
        // Use a responsive grid layout for the cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map over the listings array and render a HomeCard for each */}
          {listings.map(home => (
            <HomeCard key={home.id} home={home} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;