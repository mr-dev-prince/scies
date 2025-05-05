import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Logo } from "../constants/images";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-transparent text-black py-10 mt-10 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          <div className="md:w-1/4">
            <img src={Logo.logo} alt="SCIES Logo" className="h-12 mb-6" />
            <p className="text-sm text-gray-500">
              Empowering students through events, leadership, and community.
              Join us in shaping tomorrow.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <ul className="gap-4 text-sm text-black flex font-semibold ">
              <Link to={"/"} className="hover:text-red-700 cursor-pointer">
                Home
              </Link>
              <Link
                to={"/events"}
                className="hover:text-red-700 cursor-pointer"
              >
                Events
              </Link>
              <Link
                to={"/council"}
                className="hover:text-red-700 cursor-pointer"
              >
                Members
              </Link>
              <Link
                to={"/elections"}
                className="hover:text-red-700 cursor-pointer"
              >
                Elections
              </Link>
              <Link
                to={"/contact"}
                className="hover:text-red-700 cursor-pointer"
              >
                Contact
              </Link>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Connect With Us</h2>
            <div className="flex space-x-4">
              <Link to={"https://www.facebook.com/share/1EJdZungKA/"}>
                <FaFacebookF
                  className="text-black hover:text-red-700 cursor-pointer"
                  size={20}
                />
              </Link>
              <Link
                to={
                  "https://www.instagram.com/iesuniversity?igsh=MW12OWw2ZnRmZmx2Yw=="
                }
                target="_blank"
              >
                <FaInstagram
                  className="text-black hover:text-red-700 cursor-pointer"
                  size={20}
                />
              </Link>
              <Link
                to={"https://x.com/IESuniversity?t=B5XnWv8jN63g_-oLEtadBw&s=09"}
                target="_blank"
              >
                <FaXTwitter
                  className="text-black hover:text-red-700 cursor-pointer"
                  size={20}
                />
              </Link>
              <Link
                to={"https://www.linkedin.com/school/ies-university-bhopal/"}
              >
                <FaLinkedin
                  className="text-black hover:text-red-700 cursor-pointer"
                  size={20}
                />
              </Link>
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
