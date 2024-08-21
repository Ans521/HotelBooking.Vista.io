const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Types.ObjectId,
      ref: "Accommodation",
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    checkin: {
      type: Date,
      required: true,
    },
    checkout: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
