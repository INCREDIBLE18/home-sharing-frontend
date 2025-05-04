// src/pages/ListingDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import homesData from '../data/homes.json';
import NotFoundPage from './NotFoundPage';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const ListingDetailPage = () => {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth(); // Get auth state
  const navigate = useNavigate(); // For redirecting to login

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // --- State for Booking Section ---
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  // --- End Booking State ---

  useEffect(() => {
    const foundListing = homesData.find(home => home.id === id);
    if (foundListing) {
      setListing(foundListing);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, [id]);

  // --- Handle Booking Request ---
  const handleBookingRequest = () => {
    // Clear previous messages
    setBookingError('');
    setBookingSuccess('');

    // 1. Check if logged in (Button should be disabled, but double-check)
    if (!isLoggedIn) {
      setBookingError('Please login to request a booking.');
      // Optionally redirect to login, preserving current page
      // navigate('/login', { state: { from: location } }); // Need to import useLocation for this
      return;
    }

    // 2. Basic Validation
    if (!startDate || !endDate) {
      setBookingError('Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
       setBookingError('Check-out date must be after check-in date.');
       return;
    }

    // 3. Simulate API Call
    setBookingLoading(true);
    const bookingDetails = {
      listingId: listing.id,
      listingTitle: listing.title,
      userId: user?.id, // Get user ID from context
      userName: user?.name,
      startDate,
      endDate,
      requestedAt: new Date().toISOString(),
    };

    console.log('Simulating booking request:', bookingDetails);

    // Simulate network delay & success
    setTimeout(() => {
      setBookingLoading(false);
      setBookingSuccess('Booking requested successfully! (Demo)');
      // Optional: Clear dates after successful request
      // setStartDate('');
      // setEndDate('');
    }, 1000); // Simulate 1 second delay
  };
  // --- End Handle Booking Request ---


  // --- Updated Booking Section Renderer ---
  const renderBookingSection = () => {
    if (!listing) return null;

    return (
      <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white sticky top-[80px]"> {/* Added sticky top */}
        <h3 className="text-xl font-semibold mb-4 flex justify-between items-baseline">
          <span>
            ${listing.price_per_night}{' '}
            <span className="text-base font-normal text-gray-500">/ night</span>
          </span>
        </h3>

        {/* Display Booking Success/Error Messages */}
        {bookingError && <div className="mb-3 p-3 text-sm text-red-700 bg-red-100 rounded-lg">{bookingError}</div>}
        {bookingSuccess && <div className="mb-3 p-3 text-sm text-green-700 bg-green-100 rounded-lg">{bookingSuccess}</div>}

        {/* Date Inputs - Now controlled */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input type="date" id="start-date" value={startDate}
                 onChange={(e) => setStartDate(e.target.value)}
                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2" />
            </div>
             <div>
               <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
               <input type="date" id="end-date" value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2" />
            </div>
        </div>

        {/* Booking Button - Updated */}
        <button
          onClick={handleBookingRequest}
          disabled={!isLoggedIn || bookingLoading} // Disable if not logged in or during loading
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Change text based on login status and loading state */}
          {!isLoggedIn ? 'Login to Book' : bookingLoading ? 'Requesting...' : 'Request to Book'}
        </button>
        {isLoggedIn && <p className="text-xs text-gray-500 mt-2 text-center">You won't be charged yet (Demo Only)</p>}
      </div>
    );
  };
  // --- End Updated Booking Section ---


  // Main component return logic (loading, not found, details) remains largely the same...
  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading listing details...</div>;
  }

  if (notFound || !listing) {
    return <NotFoundPage message="Listing not found." />;
  }

  return (
    <div>
      <Link to="/listings" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Listings</Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{listing.title}</h1>
      <p className="text-md text-gray-600 mb-6">{listing.location}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2 mb-6 md:mb-0">
          <img
            src={listing.image_url || 'https://via.placeholder.com/800x600/cccccc/808080?text=No+Image'}
            alt={`View of ${listing.title}`}
            className="w-full rounded-lg shadow-lg mb-6 object-cover max-h-[500px]"
          />
           <div className="border-t border-b border-gray-200 py-4 mb-6">
               <h3 className="text-xl font-semibold mb-1">Hosted by {listing.owner.name}</h3>
           </div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">About this place</h2>
          <p className="text-gray-700 mb-4 whitespace-pre-line">{listing.description}</p>
           <h3 className="text-xl font-semibold mb-2 text-gray-800">Availability</h3>
           <p className="text-gray-700 mb-6">{listing.available_dates}</p>
        </div>
        <div className="md:col-span-1">
          {renderBookingSection()} {/* Render the updated booking section */}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;