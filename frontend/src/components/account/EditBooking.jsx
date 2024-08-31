import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]); // For storing image URLs

  useEffect(() => {
    if (!id) return;

    axios.get("/auth/bookings").then(({ data }) => {
      const booking = data.find((item) => item._id === id);
      if (booking) {
        setCheckin(booking.checkin);
        setCheckout(booking.checkout);
        setGuests(booking.guests);
        setPrice(booking.price);
        setImages(booking.place.images);
      }
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put("auth/update/booking", {
        id,
        checkin,
        checkout,
        guests,
      });
      alert("Saved changes");
      navigate("/account/bookings");
    } catch (error) {
    //   alert("Failed to save changes. Please try again.");
    console.log(error)
    }
  };

  const handleDelete = async () => {
   try{
    await axios.post('auth/delete',{
        id
    })
    alert("Booking deleted");
    navigate("/account/bookings");
   }catch(error){
    console.log(error)
   }
  };
  return (
    <div className="edit-booking-page p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Vista.io</h1>
        <h1 className="text-4xl font-bold text-gray-800">Edit Your Booking</h1>
      </header>

      <div className="edit-booking-card bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex">
          {/* Images */}
          <div className="w-1/3">
            {images.length > 0 ? (
              <img
                src={`http://localhost:3000/uploads/${images[0]}`}
                alt={`Booking Image`}
                className="rounded-lg object-cover h-full mb-4"
              />
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Booking Information */}
          <div className="w-2/3 pl-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Check-in:
              </label>
              <input
                type="date"
                value={checkin.split("T")[0]} // Set the date value
                onChange={(e) => setCheckin(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Check-out:
              </label>
              <input
                type="date"
                value={checkout.split("T")[0]}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Guests:
              </label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full p-2 border rounded-lg"
                min="1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Price:
              </label>
              <input
                type="number"
                readOnly
                value={price}
                className="w-full p-2 border rounded-lg outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex mt-4">
              <button
                onClick={handleDelete}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-4"
              >
                Cancel Booking
              </button>
              <button onClick={handleUpdate} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;
