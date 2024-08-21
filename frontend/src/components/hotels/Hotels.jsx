import React, { useEffect, useState } from "react";
import "./hotels.css";
import { Link } from "react-router-dom";

import axios from "axios";

function Hotels() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/auth/places")
      .then(({ data }) => {
        console.log("Places:", data.places);
        setPlaces(data.places);
      })
      .catch((error) => {
        console.error("Error fetching the places:", error);
      });
  }, []);
  return (
    <div className="bg-white w-full h-full flex justify-center">
      <div className="h-full w-full flex flex-wrap gap-4 justify-center item-center overflow-hidden mb-5">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={`/place/${place._id}`} className="card flex items-center h-full w-96 p-2 m-1 transition-shadow duration-300 rounded-md overflow-hidden">
              <div className="gap-2" key={place._id}>
                <img
                  className="h-full w-auto transition-all ease duration-300 object-cover object-center rounded-lg"
                  src={`http://localhost:3000/uploads/${place.images[0]}`}
                  alt="#"
                />
                <div className="card-body w-full mt-5 flex flex-col gap-2 px-4">
                  <h3 className="text-3xl font-bold">{place.address}</h3>
                  <h3 className="text-2xl font-bold">{place.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {place.description}
                  </p>
                  <div className="flex gap-2 items-center">
                    <i className="fas fa-star text-yellow-500"></i>
                  <span className="text-2xl font-bold">${place.price}</span> per night
                    </div>
                </div>
                <div className="flex justify-between p-2 w-full mt-2">
                  <button className="bg-red-600 text-white p-4 shadow-lg rounded-lg font-semibold border-none">
                    Book Now
                  </button>
                  <button className="bg-red-600 text-white p-4 shadow-lg rounded-lg font-semibold border-none">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Hotels;
