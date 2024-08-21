// src/components/BookingForm.jsx

import React from 'react';

const BookingForm = () => {
  return (
<div className='w-full flex items-center justify-center min-h-40 sm:min-h-32 md:min-h-32'>
      <div className="border-2 w-full border-gray-300 -top-8 relative max-w-3xl mx-auto p-4 sm:p-6 md:p-6 bg-white shadow-md rounded-2xl">
        <form className="flex flex-col sm:flex-row md:flex-row gap-1 sm:gap-3 ">
          {/* Where Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="where" className="text-gray-700 font-semibold mb-2">Where</label>
            <input
              type="text"
              id="where"
              placeholder="Destination"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Check-in Date Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="checkin" className="text-gray-700 font-semibold mb-2">Check-in</label>
            <input
              type="date"
              id="checkin"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Check-out Date Input */}
        <div className='flex flex-col w-full'>
            <label htmlFor="checkout" className="text-gray-700 font-semibold mb-2">Check-out</label>
            <input
              type="date"
              id="checkout"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
       
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
