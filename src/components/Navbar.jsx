import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../constants/images";
import ProfileModal from "./ProfileModal";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to} 
        className={`transition duration-200 ${
          isActive 
            ? "text-black font-bold border-b-2 border-black" 
            : "text-white hover:text-black"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  
  const user = useMemo(() => {
    const userData = localStorage.getItem("user");
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Invalid user JSON in localStorage", error);
      return null;
    }
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/members", label: "Members" },
    { path: "/elections", label: "Elections" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-white via-sky-200 to-sky-600 shadow-md px-6 fixed top-0 w-full h-[10vh] z-50">
        <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
          <Link
            to="/"
            className="h-20 w-44 items-center justify-center flex"
            aria-label="Home"
          >
            <img
              className="h-full w-full object-contain"
              src={Logo.logo}
              alt="Logo"
            />
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex gap-10 font-medium text-xl cal-sans tracking-wider">
              {navLinks.map(link => (
                <NavLink key={link.path} to={link.path}>
                  {link.label}
                </NavLink>
              ))}
            </ul>
            
            <div>
              {user ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="h-10 w-10 flex items-center justify-center border-2 border-black/50 text-red-600 bg-blue-200 font-semibold rounded-full overflow-hidden"
                  aria-label="Profile"
                >
                  {user.profileImg ? (
                    <img
                      src={user.profileImg}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    user.email?.charAt(0).toUpperCase() || "U"
                  )}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-red-600 font-semibold text-white rounded hover:bg-red-900 hover:scale-95 transition-all duration-200"
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {showProfile && (
        <ProfileModal user={user} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Navbar;