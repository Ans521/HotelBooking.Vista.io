import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/herosection/heroSection";
import InputField from "./components/input/inputField";
import Hotels from "./components/hotels/Hotels"; 
import Footer from "./components/footer/footer";
import { UserProvider } from "./components/ContextStore/userContext";
// import { UserProvider} from "./components/ContextStore/userContext.jsx";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InputField />
      <Hotels />
      <Footer />
    </>
  );
}

export default App;
