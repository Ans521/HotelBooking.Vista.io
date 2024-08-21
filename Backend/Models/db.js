// require('dotenv').config();

const mongoose = require('mongoose');

const mongo_url = "mongodb://localhost:27017/neenasharma";
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB error:', err);
  }
};


module.exports = connectToDatabase;
; // Export the mongoose instance
