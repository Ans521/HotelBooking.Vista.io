import React, { useContext} from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../ContextStore/userContext.jsx";
function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  console.log("User from context:", user);
  async function handleLogout() {
    try {
      await axios.post("auth/logout", {
        withCredentials: true, 
      });
      setUser(null);
        navigate("/");
      alert('Logged out successfully');
    } catch (err) {
      alert("Logout Failed");
    }
  }
  return (
    <div className="nav h-20 flex justify-between items-center bg-transparent shadow-lg z-10 w-full">
      <div className="logo mt-2 font-bold p-2 ml-2 sm:ml-2 md:ml-4 lg:ml-6">
        <h1 className="logo1 text-3xl">VISTA.IO</h1>
      </div>
      <div className="navbar flex md:flex-row justify-center items-center gap-4 md:gap-4 lg:gap-8 px-2 sm:mr-1 md:mr-5 lg:mr-10 py-2 mt-2">
      <NavLink to="/">Home</NavLink>
      <NavLink className={({ isActive }) => (isActive ? "text-customColor " : "")} to="/">Hotels</NavLink>
      <NavLink to="/wishlist">Wishlist</NavLink>
    </div>
      <div className="button mt-2 flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="btn">
          <Link 
            to= {user ? "/account" : "/signup"}
            className="slide_from_left flex justify-center items-center text-center"
          >
            {user ? "Account" : "Sign Up"}
            
          </Link>
        </div>
        {user ? (
          <Link
            to="/"
            className="slide_from_right flex justify-center items-center text-center"
          >
            <i className="fa-solid fa-right-from-bracket" onClick={handleLogout}></i>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
