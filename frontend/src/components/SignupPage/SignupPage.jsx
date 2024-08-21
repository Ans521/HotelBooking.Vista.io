import React, { useState, useEffect, useContext } from "react";
import "./SignupPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextStore/userContext";
function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit button clicked");
    try {
      await axios.post("/auth/signup", {
        // /auth/signup iss url pe requst jayegiii
        name,
        email,
        password,
      });
      alert("Registration Successful, Login to continue");
    } catch (err) {
      alert("Registration Failed");
    }
  }
  async function handleUserLogin(e) {
    e.preventDefault();
    console.log("login button clicked");

    try {
      const {data, status} = await axios.post(
        "/auth/login",
        {
          // /auth/login is the URL for the login request
          email,
          password,
        },
        {
          withCredentials: true, // Ensure cookies are sent and received
        }
      );
      if (status === 200) {;
          alert("User found");
        setUser(data.userDoc);
        console.log(data.userDoc.name);
        setRedirect(true);;
         
      }
    } catch (err) {
      if(err.response.status === 401) {
        alert("User not found");
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row lg:flex-row sm:justify-start md:justify-start lg:justify-center items-center w-full min-h-screen bg-gradient-to-r from-blue-200 to-gray-300 p-6">
      <div className="flex justify-center items-center bg-white max-w p-8 m-4 rounded-sm shadow-2xl w-full">
        {/* Sign Up Form */}
        <div className="w-full p-4">
          <h1 className="text-3xl w-full font-bold text-center mb-6 text-gray-800 underline-hover cursor-pointer">
            Sign Up
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      {/* Separator */}
      <div className="w-1/12 text-center">
        <span className="block font-semibold text-gray-800">OR</span>
      </div>

      {/* Login Form */}
      <div className="flex justify-center items-center bg-white max-w-4xl p-8 m-4 rounded-sm shadow-2xl w-full">
        <div className="w-full p-4">
          <h1 className="text-3xl w-full font-bold text-center mb-6 text-gray-800 underline-hover cursor-pointer">
            Log In
          </h1>
          <form className="space-y-6" onSubmit={handleUserLogin}>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
