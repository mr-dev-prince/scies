import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../constants/images";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const user = (() => {
    const userData = localStorage.getItem("user");
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Invalid user JSON in localStorage", error);
      return null;
    }
  })();

  return (
    <>
      <div className="bg-gradient-to-r from-white via-sky-200 to-sky-600 shadow-md px-6 fixed top-0 w-full h-[10vh] z-50">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="h-20 w-44 ml-10 items-center justify-center flex"
          >
            <img
              className="h-full w-full object-contain"
              src={Logo.logo}
              alt="Logo"
            />
          </Link>
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex gap-10 text-white font-medium text-xl cal-sans tracking-wider text-pretty">
              <li>
                <Link to="/" className="hover:text-black duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-black duration-200">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/members" className="hover:text-black duration-200">
                  Members
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-black  duration-200 ">
                  Contact
                </Link>
              </li>
            </ul>
            <div>
              {user ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="h-10 w-10 flex items-center justify-center border-2 border-black/50 text-red-600 bg-blue-200 font-semibold rounded-full "
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
        </div>
      </div>
      {showProfile && (
        <ProfileModal user={user} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Navbar;
