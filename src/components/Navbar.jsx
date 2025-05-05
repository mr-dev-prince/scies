import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../constants/images";
import ProfileModal from "./ProfileModal";
import { Menu, X } from "lucide-react";

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li onClick={onClick}>
      <Link
        to={to}
        className={`block w-full py-2 px-4 text-left transition duration-200 ${
          isActive
            ? "text-black font-bold border-l-4 border-black bg-white"
            : "text-gray-800 hover:bg-gray-100"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { path: "/council", label: "Council" },
    { path: "/elections", label: "Elections" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-white via-sky-200 to-sky-600 shadow-md px-6 fixed top-0 w-full h-[10vh] z-50">
        <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
          <Link
            to="/"
            className="h-20 w-44 flex items-center justify-center"
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
              {navLinks.map((link) => (
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
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold text-gray-800">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col mt-4 gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </ul>
        <div className="p-4 border-t mt-6">
          {user ? (
            <button
              onClick={() => {
                setShowProfile(true);
                setMobileMenuOpen(false);
              }}
              className=" w-full flex items-center justify-between border border-black/50 text-red-600 bg-blue-200 font-semibold rounded-md p-1 overflow-hidden"
              aria-label="Profile"
            >
              <div>
                {user.profileImg ? (
                  <img
                    src={user.profileImg}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  user.email?.charAt(0).toUpperCase() || "U"
                )}
              </div>
              <p className="text-xl font-semibold">{user.name}</p>
            </button>
          ) : (
            <Link
              to="/login"
              className="block mt-3 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-900 hover:scale-95 transition-all duration-200 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>

      {showProfile && (
        <ProfileModal user={user} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Navbar;
