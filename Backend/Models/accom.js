const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String // Trims whitespace from input
    },
    description: {
      type: String
    },
    address: {
      type: String
    },
    price:{
      type: Number
    },
    images: [String],
    perks: {
      type: [String],
      default: [], // Default to an empty array if no perks are provided
    }, 

    checkin: {
      type: Date,
    },
    checkout: {
      type: Date, 
    },
    maxGuests: {
      type: Number,
      min:1, // Ensures at least one guest is allowed
    },
  },
  { timestamps: true }
);

const accomModel= mongoose.model("Accommodation", accommodationSchema);

module.exports = accomModel;
