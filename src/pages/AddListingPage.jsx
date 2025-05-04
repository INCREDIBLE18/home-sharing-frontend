// src/pages/AddListingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Optional: To get user info if needed

const AddListingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user info if needed for association (though we won't save it)

  // State for form inputs
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [availableDates, setAvailableDates] = useState(''); // Simple text input for now

  // State for feedback/loading
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Basic validation (optional)
    if (!title || !location || !price) {
        setError('Please fill in Title, Location, and Price per Night.');
        setLoading(false);
        return;
    }

    // Simulate API call / Saving data
    const newListingData = {
      title,
      location,
      description,
      price_per_night: Number(price), // Ensure price is a number
      image_url: imageUrl,
      available_dates: availableDates,
      owner: user // Associate with the logged-in user (from context)
    };

    console.log('Simulating adding new listing:', newListingData);

    // --- Mock Success ---
    // In a real app, you'd wait for API response. Here we just assume success.
    setSuccess('Listing added successfully! (Demo)');
    setLoading(false);

    // Optional: Clear the form after submission
    // setTitle(''); setLocation(''); setDescription(''); setPrice(''); setImageUrl(''); setAvailableDates('');

    // Redirect after a short delay
    setTimeout(() => {
      navigate('/listings'); // Redirect to the main listings page
    }, 1500); // Wait 1.5 seconds
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Home Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display Success/Error Messages */}
        {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
        {success && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Cozy Beach House" />
        </div>

        {/* Location Input */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location *</label>
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Sunset Beach, CA" />
        </div>

        {/* Description Textarea */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Tell guests about your place..." />
        </div>

        {/* Price Input */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Night ($) *</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="1"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 150" />
        </div>

        {/* Image URL Input */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="https://example.com/image.jpg" />
        </div>

        {/* Available Dates Input (Simple text for now) */}
        <div>
          <label htmlFor="availableDates" className="block text-sm font-medium text-gray-700">Available Dates</label>
          <input type="text" id="availableDates" value={availableDates} onChange={(e) => setAvailableDates(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., June 1 - August 31, 2025" />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Add Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListingPage;