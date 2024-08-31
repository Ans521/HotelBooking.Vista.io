import React, { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextStore/userContext";
import axios from "axios";
import Accom from "./accom";

function Account() {
  const { user, ready, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  let { page } = useParams();
  if (!ready) {
    return <h1>Loading...</h1>;
  }

  if (!user && ready) {
    return <Navigate to="/" />;
  }

  if (page === undefined) page = "profile";

  function onHover(type = null) {
    let classes =
      "inline-flex gap-1 font-semibold px-3 py-3 bg-gray-200 text-black rounded-full ";
    if (type === page) {
      classes += "bg-blue-900 text-white rounded-full";
    }
    return classes;
  }

  async function logout() {
    await axios.post("/auth/logout");
    setUser(null);
    navigate("/");
  }

  return (
    <div className="account-container px-4 py-4 sm:px-6 md:px-8 lg:px-12">
      <header className="account-header flex justify-between items-center mb-6">
        <div className="brand-name text-2xl md:text-3xl font-bold">Vista.io</div>
        <Link to={'/'} className="btn-now-button relative px-4 py-2 border border-black rounded text-black text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-blue-900 hover:text-white">
          Book Now
        </Link>
      </header>
      <nav className="w-full flex justify-center text-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 mt-8 mb-8">
        <Link to="/account" className={onHover("profile")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          Profile
        </Link>
        <Link to="/account/bookings" className={onHover("bookings")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>
          Bookings
        </Link>
        <Link className={onHover("accom")} to="/account/accom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
          Accommodation
        </Link>
      </nav>

      {page === "profile" && (
        <div className="profile block max-w-lg mx-auto shadow-md rounded-lg p-6 mt-4 bg-slate-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
            Logged in as
          </h2>
          <p className="text-gray-700 mb-4">
            <p className="font-semibold">{user.name}</p> ({user.email})
          </p>
          <div className="flex justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {page === "accom" && (
        <div>
          <Accom/>
        </div>
      )}
    </div>
  );
}

export default Account;
