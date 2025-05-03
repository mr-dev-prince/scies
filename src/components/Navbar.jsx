import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../constants/images";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="bg-gradient-to-r from-white via-sky-200 to-sky-600 shadow-md px-6 fixed top-0 w-full h-[10vh] z-50">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="h-20 w-44 ml-10 items-center justify-center flex"
          >
            <img className="h-14 " src={Logo.logo} alt="Logo" />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6 text-white font-medium text-xl">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 hover:bg-gray-200/50 px-3 rounded-md py-1 duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-blue-600 hover:bg-gray-200/50 px-3 rounded-md py-1 duration-200"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/members"
                  className="hover:text-blue-600 hover:bg-gray-200/50 px-3 rounded-md py-1 duration-200"
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 hover:bg-gray-200/50 duration-200 px-3 rounded-md py-1"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="space-x-4">
              {user ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="h-10 w-10 flex items-center justify-center border-2 border-blue-600 text-red-600 bg-blue-200 font-semibold rounded-full "
                >
                  {user.profileImg ? (
                    <img
                      src={user.profileImg}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    user.email.charAt(0).toUpperCase()
                  )}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-red-600 font-semibold text-white rounded hover:bg-red-900 hover:scale-95 transition"
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-gray-700"></div>
                <div className="w-6 h-0.5 bg-gray-700"></div>
                <div className="w-6 h-0.5 bg-gray-700"></div>
              </div>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4 text-gray-700 font-medium">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/college" className="hover:text-blue-600">
                  College
                </Link>
              </li>
            </ul>
            <div className="space-y-2 pt-2">
              <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition">
                Sign Up
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
      {showProfile && (
        <ProfileModal user={user} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Navbar;
