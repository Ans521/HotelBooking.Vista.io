// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center gap-3 sm:gap-3">
         <h1 className='text-4xl font-bold cursor-pointer mb-2'> VISTA.IO</h1>
          <div className="mb-4 md:mb-0"> 
            <h2 className="text-2xl font-bold cursor-progress -mb-2">Hotel Booking</h2>
          </div>
          {/* Links Section */}
          <div className="links flex flex-col items-center md:flex-row gap-4">
            <a href="#" className=" hover:underline transform hover:-translate-y-1 hover:text-blue-400 duration-300">
              About Us
            </a>  
            <a href="#" className=" hover:underline transform hover:-translate-y-1 hover:text-blue-400 duration-300">
              Contact
            </a>  
            <a href="#" className=" hover:underline transform hover:-translate-y-1 hover:text-blue-400 duration-300">
             Privacy Policy
            </a>  
        

          </div>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-blue-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-blue-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 VISTA.IO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
