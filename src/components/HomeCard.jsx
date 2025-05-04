// src/components/HomeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// This component expects a 'home' object as a prop
// containing id, image_url, title, location, price_per_night
const HomeCard = ({ home }) => {
  return (
    // Wrap the entire card in a Link to its detail page
    <Link
      to={`/listings/${home.id}`}
      className="block border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      {/* Listing Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          // Use a more robust image source or add error handling if needed
          src={home.image_url || 'https://via.placeholder.com/400x300/cccccc/808080?text=No+Image'}
          alt={`View of ${home.title}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" // Added subtle hover effect
        />
      </div>

      {/* Listing Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate" title={home.title}>
          {home.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 truncate" title={home.location}>
          {home.location}
        </p>
        <p className="text-gray-900 font-bold">
          ${home.price_per_night}{' '}
          <span className="font-normal text-sm text-gray-500">/ night</span>
        </p>
      </div>
    </Link>
  );
};

export default HomeCard;