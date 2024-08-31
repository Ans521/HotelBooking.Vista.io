import React, { useEffect, useState, useContext } from "react";
import "./hotels.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../components/ContextStore/userContext";

function Hotels() {
  const [places, setPlaces] = useState([]);
  const { destination } = useContext(UserContext);
  const Navigate = useNavigate();
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

  const filteredPlaces = destination
    ? places.filter((place) =>
        place.address.toLowerCase().includes(destination.toLowerCase())
      )
    : places;

  const handleWishList = async (hotelId) => {
    try {
      const response = await axios.post("/auth/wishlist", { hotelId });
      console.log(response.data);
      Navigate("/wishlist");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Already in wishlist");
        Navigate("/wishlist");
        console.error("Error:", error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="bg-white w-full h-full flex justify-center">
    <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-start overflow-hidden mb-4 p-4">
      {filteredPlaces.length > 0 &&
        filteredPlaces.map((place) => (
          <div
            className="card h-full w-full p-2 m-1 transition-shadow duration-300 rounded-md overflow-hidden"
            key={place._id}
          >
            <div className="gap-2">
              <div className="w-full h-80 rounded-xl overflow-hidden">
                <img
                  className="h-full w-full transition-all ease duration-300 object-cover object-center"
                  src={`http://localhost:3000/uploads/${place.images[0]}`}
                  alt="#"
                />
              </div>
              <div className="card-body w-full mt-5 flex flex-col gap-1 px-4">
                <h3 className="text-3xl font-bold">
                  {place.address}
                </h3>
                <h3 className="text-2xl font-bold">{place.title}</h3>
                <h3 className="text-gray-600 text-xl leading-relaxed">
                  {place.address}
                </h3>
                <div className="flex gap-2 items-center">
                  <i className="fas fa-star text-yellow-500"></i>
                  <span className="text-2xl font-bold">
                    ${place.price}
                  </span>{" "}
                  per night
                </div>
              </div>
              <div className="flex justify-between p-2 w-full mt-2">
                <Link
                  to={`/place/${place._id}`}
                  className="bg-gradient-to-tr from-blue-400 to-purple-600 text-white p-4 shadow-lg rounded-lg font-semibold border-none transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Book Now
                </Link>
                <button
                  onClick={() => handleWishList(place._id)}
                  className="bg-gradient-to-tr from-blue-400 to-purple-600 text-white p-4 shadow-lg rounded-lg font-semibold border-none"
                >
                  Wish List
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
  
  );
}

export default Hotels;
