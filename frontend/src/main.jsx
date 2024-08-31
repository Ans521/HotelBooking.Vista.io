import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./components/SignupPage/SignupPage.jsx";
import { UserProvider } from "./components/ContextStore/userContext.jsx";
import Account from "./components/account/Account.jsx";
import HotelForm from "./components/account/HotelForm.jsx";
import Booking from "./components/account/Booking.jsx";
import BookingPage from "./components/account/BookingPage.jsx";
import EditBooking from "./components/account/EditBooking.jsx";
import WishlistHotels from "./wishlisthotels/WishlistHotels.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <loginPage />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/account/:page?",
    element: <Account />,
  },
  {
    path: "/account/:page/:place",
    element: <Account />,
  },
  {
    path: "/account/hotel/:id",
    element: <HotelForm />,
  },
  {
    path: "/place/:id",
    element: <Booking />,
  },
  {
    path :"account/bookings",
    element: <BookingPage/>
  },
  {
    path : "details/:id",
    element : <EditBooking/>
  },
  {
    path :"wishlist",
    element: <WishlistHotels/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
