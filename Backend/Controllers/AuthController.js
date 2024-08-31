const User = require("../Models/user");
const bcrypt = require("bcrypt");
const connectToDatabase = require("../Models/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jafkq32483hvv";
const cookie = require("cookie");
const path = require("path");
const downloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const hotelData = require("../Models/accom");
const bookingHotel = require("../Models/booking");
const Wishlist = require("../Models/wishlist");
connectToDatabase();

const registerUser = async (req, res) => {
  try {
    // Ensure connection is established
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = new User({
      name,
      email,
      password: hashedPassword,
    });
    await userCreated.save();
    res.status(201).json({ message: "User registered successfully" });

    console.log(userCreated);
    // ... rest of your code
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      // User not found
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    // Compare passwords

    const isPasswordCorrect = await bcrypt.compare(password, userDoc.password);
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        JWT_SECRET
      );

      res
        .cookie("token", token)
        .status(200)
        .json({ message: "Password OK", userDoc });
    } else {
      res.status(401).json("password not ok");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const profile = (req, res) => {
  // When the user logs in successfully, a token is created and sent as a cookie in the response.In the profile endpoint, you retrieve the token from the cookies attached to the incoming request.If we use cookie-parser middleware in our Express app, it parses cookies and makes them available via req.cookies.
  const { token } = req.cookies;
  // res.json({ token });

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, userDoc) => {
      if (err) throw err;
      console.log("user doc", userDoc);
      const userInfo = await User.findById(userDoc.id);
      res.json(userInfo);

      console.log("Decoded userDoc:", userDoc);
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
};

const imageUploader = async (req, res) => {
  try {
    const { imgurl } = req.body;
    if (!imgurl) {
      return res.json({ message: "no url provided" });
    }
    const picName = Date.now() + ".jpg";
    const destPath = path.join(__dirname, "../uploads", picName);
    console.log("Destination Path:", destPath); // Log path for debugging
    await downloader.image({
      url: imgurl,
      dest: destPath,
    });

    res.status(200).json({ message: "Image uploaded successfully", picName });
  } catch (error) {
    console.error("Error uploading image:", error);
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
};

// Configure multer to store files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const photosMiddleware = multer({ storage: storage });

// Handle file upload
const photoUploader = (req, res) => {
  photosMiddleware.array("photos", 100)(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const uploadedImages = [];
    for (let i = 0; i < req.files.length; i++) {
      const { filename } = req.files[i];
      console.log("Uploaded image:", filename);
      uploadedImages.push([filename]);
    }
    res.json({ message: "Files uploaded successfully", uploadedImages });
  });
};

// data insert in database of hotel
const registerData = async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    price,
    images,
    perks,
    checkin,
    checkout,
    maxGuests,
  } = req.body;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, userDoc) => {
      if (err) throw err;

      const registerData = await hotelData.create({
        owner: userDoc.id,
        title,
        address,
        description,
        images,
        perks,
        checkin,
        checkout,
        maxGuests,
      });

      res.json({ message: "Data added successfully", registerData });
    });
  }
};

// hotel ke record fetch krne ke liye
const records = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, JWT_SECRET, async (err, userDoc) => {
    if (err) throw err;
    const { id } = userDoc;
    const userHotels = await hotelData.find({ owner: id });
    res.json({ message: "successfully", userHotels });
  });
};

const hotelId = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await hotelData.findById(id); // Use the id directly
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json({ message: "data added successfully", hotel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const update = async (req, res) => {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    description,
    price,
    images,
    perks,
    checkin,
    checkout,
    maxGuests,
  } = req.body;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, userDoc) => {
      if (err) throw err;
      const hotelDoc = await hotelData.findById(id);
      console.log("hotelDoc:", hotelDoc.owner.toString());
      console.log("userDoc:", userDoc.id);
      if (hotelDoc.owner.toString() === userDoc.id) {
        hotelDoc.set({
          title,
          address,
          description,
          price,
          images,
          perks,
          checkin,
          checkout,
          maxGuests,
        });
        await hotelDoc.save();
        res.json({ message: "data added successfully", hotelDoc });
      }
    });
  }
};

const Places = async (req, res) => {
  try {
    const places = await hotelData.find();
    res.json({ status: "ok", places: places });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getUserId = (req) => {
  const { token } = req.cookies;

  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, userDoc) => {
      if (err) {
        return reject(err); // Reject the promise with the error
      }
      resolve(userDoc.id); // Resolve with the user ID
    });
  });
};

const createBooking = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { place, checkin, checkout, guests, name, price, email } = req.body;

    const booking = await bookingHotel.create({
      place,
      checkin,
      checkout,
      guests,
      name,
      price,
      email,
      owner: userId, // Assign the user ID to the owner field
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const bookings = await bookingHotel
      .find({ owner: userId })
      .populate("place");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const handleBookingUpdate = async (req, res) => {
  const { id, checkin, checkout, guests, price } = req.body;
  const token = req.cookies.token; // Ensure token is properly extracted

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const userDoc = jwt.verify(token, JWT_SECRET); // Verify the token to get the user
    const booking = await bookingHotel.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.owner.toString() === userDoc.id) {
      booking.set({ checkin, checkout, guests, price });
      await booking.save();
      res
        .status(200)
        .json({ message: "Booking updated successfully", booking });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

const handleDelete = async (req, res) => {
  const { id } = req.body;
  await bookingHotel.findByIdAndDelete(id);
  res.json({ message: "Booking deleted successfully" });
};

const userWishlist = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { hotelId } = req.body;

    // Check if the hotel is already in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({
      user: userId,
      hotel: hotelId,
    });
    if (existingWishlistItem) {
      return res
        .status(400)
        .json({ message: "Hotel is already in your wishlist." });
    }

    // Create and save the new wishlist item
    const wishlistItem = await Wishlist.create({
      user: userId,
      hotel: hotelId,
    });

    const wishlistItemWithHotel = await wishlistItem.populate("hotel");
    // Respond with a success message
    res.status(201).json({
      message: "Hotel added to your wishlist.",
      wishlistItemWithHotel,
    });
  } catch (error) {
    // Send a generic error message
    res.status(500).json({
      message: "An error occurred while adding the hotel to your wishlist.",
      error,
    });
  }
};

const wishList = async (req, res) => {
  try {
    const userId = await getUserId(req);

    const hotelwishlist = await Wishlist.find({ user: userId }).populate(
      "hotel"
    );
    res.json({ hotelwishlist });
  } catch (error) {
    res.json({ message: "error" });
  }
};

const removeWishlist = async (req, res) => {
  try {
    const { hotelId } = req.body;
    const userId = await getUserId(req);
    const removed = await Wishlist.findOneAndDelete({hotel : hotelId, user : userId});
    res.json({ message: "Hotel removed from wishlist", removed});
  } catch (error) {
    res.json({ message: "error" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  profile,
  logout,
  imageUploader,
  photoUploader,
  registerData,
  records,
  hotelId,
  update,
  Places,
  createBooking,
  getBookingDetails,
  handleBookingUpdate,
  handleDelete,
  userWishlist,
  wishList,
  removeWishlist,
};
