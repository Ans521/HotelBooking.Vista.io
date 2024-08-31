import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextStore/userContext";
import axios from "axios";
const BookingForm = () => {
  const { destination, setDestination } = useContext(UserContext);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  
  return (
    <div className="w-full flex items-center justify-center min-h-40 sm:min-h-32 md:min-h-32">
      <div className="border-2 w-full border-gray-300 -top-8 relative max-w-3xl mx-auto p-4 sm:p-6 md:p-6 bg-white shadow-md rounded-2xl">
        <form className="flex flex-col sm:flex-row md:flex-row gap-1 sm:gap-3">
          {/* Where Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="where" className="text-gray-700 font-semibold mb-2">
              Where
            </label>
            <input
              type="text"
              id="where"
              value={destination}
              placeholder="Destination"
              onChange={(e) => setDestination(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Check-in Date Input */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="checkin"
              className="text-gray-700 font-semibold mb-2"
            >
              Check-in
            </label>
            <input
              type="date"
              id="checkin"
              onChange={(e) => setCheckin(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Check-out Date Input */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="checkout"
              className="text-gray-700 font-semibold mb-2"
            >
              Check-out
            </label>
            <input
              type="date"
              id="checkout"
              onChange={(e) => setCheckout(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-4 gap-4">
            <button
              type="submit"
              className="bg-gradient-to-br from-blue-300 to-purple-500 text-white py-2 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
