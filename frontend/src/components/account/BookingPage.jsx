import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/auth/bookings")
      .then(({ data }) => {
        setBookings(data);
        console.log("Booking data:", data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  return (
    <div className="booking-page p-6 bg-gray-100 min-h-screen">
      {/* Logo */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Vista.io</h1>
        <h1 className="text-4xl font-bold text-gray-800">Your Bookings</h1>
      </header>

      {/* Booking Cards */}
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        bookings.map((booking) => {
          const place = booking.place;
          return (
            <div key={booking._id} className="booking-card flex bg-white shadow-md rounded-lg p-4 mb-6">
              {/* Image */}
              <div className="w-1/3">
                {place.images.length > 0 && (
                  <img
                    src={`http://localhost:3000/uploads/${place.images[0]}`}
                    alt="Booking"
                    className="rounded-lg object-cover h-full"
                  />
                )}
              </div>

              {/* Booking Information */}
              <div className="w-2/3 pl-6">
                <h2 className="hotel-title text-2xl font-semibold text-gray-800 mb-2">{place?.title || "Unknown Place"}</h2>
                <p className="text-gray-600 mb-4">{place.description}</p>
                <p className="text-gray-700"><strong>Check-in:</strong> {new Date(booking.checkin).toLocaleDateString()}</p>
                <p className="text-gray-700"><strong>Check-out:</strong> {new Date(booking.checkout).toLocaleDateString()}</p>
                <p className="text-gray-700"><strong>Guests:</strong> {booking.guests}</p>
                <p className="text-gray-700"><strong>Name:</strong> {booking.name}</p>
                <p className="text-gray-700"><strong>Email:</strong> {booking.email}</p>
                <p className="text-gray-700"><strong>Price:</strong> ${booking.price}</p>
              </div>
            </div>
          );
        })
      )}

      {/* Book More Button */}
      <div className="text-center mt-8">
        <Link to={"/"} className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
          Book More
        </Link>
      </div>
    </div>
  );
};

export default BookingPage;
