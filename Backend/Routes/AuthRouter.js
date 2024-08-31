const express = require("express");
const {
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
} = require("../Controllers/AuthController");
const router = express.Router();

router.post("/signup", registerUser); // Handle user registration
router.post("/login", loginUser); // Handle user login
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/imgurl", imageUploader); // Route for image uploading
router.post("/upload", photoUploader);
router.post("/data", registerData);
router.get("/records", records);
router.get("/hotel/:id", hotelId);
router.put("/update", update);
router.get("/places", Places);
router.post("/booking", createBooking);
router.get("/bookings", getBookingDetails);
router.put("/update/booking", handleBookingUpdate);
router.post("/delete", handleDelete);
router.post("/wishlist", userWishlist);
router.get("/getwishlist", wishList);
router.post("/removewishlist", removeWishlist);
module.exports = router;
