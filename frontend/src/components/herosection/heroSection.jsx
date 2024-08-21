import React, {useEffect, useState} from "react";
import "./heroSection.css"; // Import CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-section h-screen">
      <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
      <div className="headline w-full p-6 text-center">
        <h1 className="z-20 headline1 text-7xl text-white mb-2">Enjoy Your Stay</h1>
        <p className="para text-2xl text-white text-center">
          Discover the beauty of nature at our hotel. Our hotel offers a unique
          experience that combines comfort, luxury, and exceptional service.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
