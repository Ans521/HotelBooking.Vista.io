import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AddPage() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get("/auth/records")
      .then(({ data }) => {
        const { userHotels } = data;
        console.log(userHotels[0]); // Debugging line to verify data
        setHotels(userHotels); // Set the hotels state directly
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error); // Error handling
      });
  }, []);

  return (
    <div>
      <div className="text-center">
        <Link
          className="inline-flex gap-1 font-semibold px-3 py-3 bg-gray-200 text-black rounded-full"
          to={"/account/accom/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add Accommodation
        </Link>
      </div>
      {hotels.length > 0 && (
        <div className="mt-4 p-2">
          <div className="flex flex-wrap justify-center">
            {hotels.map((hotel, index) => (
              <Link to={"/account/hotel/" + hotel._id} key={index} className="bg-white cursor-pointer rounded-lg shadow-lg m-4 p-4 relative w-full sm:w-1/2 lg:w-1/2">
                {/* Image Box Div */}
                <div className="bg-gray-300 p-1 rounded-lg w-full h-64 flex items-center justify-center mb-4">
                  <img className="w-full h-full object-cover rounded-lg" src={'http://localhost:3000/uploads/' + hotel.images[0]} alt="Hotel Image"/>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{hotel.title}</h1>
                  <p className="text-lg text-gray-700 mb-4">{hotel.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPage;
