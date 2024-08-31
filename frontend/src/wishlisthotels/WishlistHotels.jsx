import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
function WishlistHotels() {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get("/auth/getwishlist");
        const placeWishlist = data.hotelwishlist.map((item) => item.hotel);
        setWishlist(placeWishlist);
        console.log(placeWishlist[0]);
      } catch (error) {
        console.error("Error fetching wishlist:");
      }
    };
    fetchWishlist();
  }, []);

  if (wishlist.length === 0) {
    return (
      <h1 className="text-3xl font-bold text-gray-800 mb-6 p-2">
        No Hotels Found
      </h1>
    );
  }

  async function removeWishlist(hotelId) {
    try {
      const { data } = await axios.post("/auth/removewishlist", { hotelId });
      console.log(data);
      if (data.message === "Hotel removed from wishlist") {
        setWishlist(wishlist.filter((item) => item._id !== hotelId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="relative">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 p-2">
          My Wishlist
        </h1>
        <Link
          to={"/"}
          className="absolute top-0 right-0 mt-2 mr-4 inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:from-purple-600 hover:to-blue-500 hover:rotate-3 transition-all duration-300"
        >
          Home
        </Link>
      </div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((hotel) => (
          <div
            key={hotel._id}
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-xl p-2"
          >
            <div className="flex justify-center items-center w-full h-56 rounded-xl overflow-hidden">
              <img
                className="h-full w-full transition-transform duration-300 object-cover object-center hover:scale-105"
                src={`http://localhost:3000/uploads/${hotel.images[0]}`}
                alt="#"
              />
            </div>

            <div className="p-4 bg-white">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {hotel.title}
              </h2>
              <p className="text-lg font-bold text-gray-800 mb-2">
                Price: ${hotel.price}
              </p>
              <p className="text-gray-600 mb-1">Location: {hotel.address}</p>
            </div>
            {/* agr mei transition-transform na lago or iske place pe duration lga du toh kya hoga kii duration toh tailwind duration har ek pe apply kr degaa  */}
            <div
              className="absolute z-10 right-3 bottom-3 duration-100 hover:scale-105 hover:shadow-xl rounded-full p-2 bg-white hover:bg-gray-200 hover:rotate-6"
              onClick={() => removeWishlist(hotel._id)}
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
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistHotels;
