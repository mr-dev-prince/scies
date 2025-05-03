import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Logo } from "../constants/images";

const Footer = () => {
  return (
    <footer className="bg-transparent text-black py-10 mt-10 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          <div className="md:w-1/4">
            <img src={Logo.logo} alt="SCIES Logo" className="h-12 mb-6" />
            <p className="text-sm text-gray-500">
              Empowering students through events, leadership, and community. Join us in shaping tomorrow.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2 text-sm text-black">
              <li className="hover:text-red-700 cursor-pointer">Home</li>
              <li className="hover:text-red-700 cursor-pointer">Events</li>
              <li className="hover:text-red-700 cursor-pointer">About</li>
              <li className="hover:text-red-700 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Council</h2>
            <ul className="space-y-2 text-sm text-black">
              <li className="hover:text-red-700 cursor-pointer">President</li>
              <li className="hover:text-red-700 cursor-pointer">Vice President</li>
              <li className="hover:text-red-700 cursor-pointer">Cultural</li>
              <li className="hover:text-red-700 cursor-pointer">Discipline</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Connect With Us</h2>
            <div className="flex space-x-4">
              <FaFacebookF className="text-black hover:text-red-700 cursor-pointer" size={20} />
              <FaInstagram className="text-black hover:text-red-700 cursor-pointer" size={20} />
              <FaTwitter className="text-black hover:text-red-700 cursor-pointer" size={20} />
              <FaLinkedin className="text-black hover:text-red-700 cursor-pointer" size={20} />
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-center text-gray-400">
          © {new Date().getFullYear()} SCIES. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
