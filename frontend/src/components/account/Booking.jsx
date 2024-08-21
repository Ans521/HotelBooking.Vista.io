import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../ContextStore/userContext";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPhotos, setShowPhotos] = useState(false);
 const { user } = useContext(UserContext);


  useEffect(() => {
    axios.get(`/auth/hotel/${id}`).then(({ data }) => {
      setHotel(data.hotel);
    });
  }, [id]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [id]);

  if (showPhotos) {
    return (
      <div className="container min-h-full mx-auto mt-7 p-4">
        <div className="grid min-h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          <button
            className="relative p-3 w-32 bg-gradient-to-bl from from-pink-500 to-purple-500 text-white rounded-lg"
            onClick={() => setShowPhotos(false)}
            type="button"
          >
            Close
          </button>
          {hotel?.images?.length > 0 &&
            hotel.images.map((img) => (
              <div key={img}>
                <img
                  className="w-full h-full object-cover rounded-lg shadow-lg overflow-hidden inset-0"
                  src={`http://localhost:3000/uploads/${img}`}
                  alt={hotel.title}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  let days = 0;
  function calculateTotalDays(checkin, checkout) {
    if (checkin && checkout) {
      days = differenceInCalendarDays(new Date(checkout), new Date(checkin));
    }
    return days;
  }
  const totalDays = calculateTotalDays(checkin, checkout);

 async function handleBooking(){
  const {data} = await axios.post("/auth/booking", {  checkin,
      checkout,
      guests,
      name,
      email,
      place: hotel._id,
      price: hotel.price * totalDays });
  
      if(data.message === "ok"){
        alert("Booking successful");
        navigate('/account/bookings/');
  }
}
  return (
    <div className="container min-h-screen w-full mx-auto mt-3 p-4">
      {hotel && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={hotel._id}>
          {/* Image Section */}
          <div className="relative">
            {hotel.images && hotel.images.length > 0 && (
              <>
                <img
                  className="w-full min-h-full object-cover rounded-lg shadow-lg"
                  src={`http://localhost:3000/uploads/${hotel.images[0]}`}
                  alt={hotel.title}
                />
                {hotel.images.length > 1 && (
                  <button
                    onClick={() => {
                      setShowPhotos(true);
                    }}
                    className="absolute bottom-2 right-2 bg-black text-white px-4 py-2 rounded-lg text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    Show More Pics
                  </button>
                )}
              </>
            )}
          </div>

          {/* Hotel Details Section */}
          <div className="flex flex-col gap-3 items-stretch">
            <div className="relative bg-gradient-to-br from-blue-300 to-gray-100 p-4 rounded-lg">
              <h1 className="text-4xl font-bold text-black bg-clip-text">
                {hotel.title}
              </h1>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {hotel.description}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold">Price : ${hotel.price}</span>
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold">Address:</span> {hotel.address}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold">Min Guests:</span>{" "}
              {hotel.maxGuests}
            </p>
            {/* Booking Section */}
            <div className=" flex flex-col justify-center items-center w-full h-full">
              <div className="flex flex-col bg-white p-5 rounded-lg shadow-xl w-full">
                <h2 className="text-2xl font-bold text-gray-700 mb-3 text-center">
                  Book Your Stay
                </h2>
                <div className="flex flex-row justify-center items-center gap-4 mb-1">
                  <div className="border-r pr-4">
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="checkin"
                    >
                      Check In
                    </label>
                    <input
                      type="date"
                      id="checkin"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      className="p-3 w-full lg:min-w-56 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="checkout"
                    >
                      Check Out
                    </label>
                    <input
                      type="date"
                      id="checkout"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      className="p-3 w-full lg:min-w-56 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 mb-2">
                  <div>
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="guests"
                    >
                      Guests
                    </label>
                    <input
                      type="number"
                      id="guests"
                      placeholder="Guests"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      max="3"
                      className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm"
                    />
                  </div>
                </div>
                {totalDays > 0 && (
                  <div className="flex flex-row justify-center items-center gap-4 mb-2">
                    <div className="border-r pr-4">
                      <label className="block text-gray-700 mb-2">
                        Your Email
                      </label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 w-full border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" >
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm"
                      />
                    </div>
                    <div className="flex pl-1 justify-center items-center ">
                      <h3 className="font-semibold text-xl text-gray-900">
                        Total:
                      </h3>
                      <span className="text-lg text-gray-800">
                        ${hotel.price * totalDays}
                      </span>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleBooking}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 text-white font-bold py-2 px-2 rounded-lg transition-transform duration-200 shadow-md text-xl"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
