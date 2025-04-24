import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/DDlogo.png";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Homebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-[#1e1f38] shadow-md fixed top-0 z-10">
      {/* Left - Logo */}
      <Link to="/signup" className="flex items-center gap-2">
        <img src={logo} alt="DevDock" className="h-10 w-auto" />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/about"
          className="text-white hover:text-[#7E4BDE] transition duration-200"
        >
          About
        </Link>
        <Link
          to="/service"
          className="text-white hover:text-[#7E4BDE] transition duration-200"
        >
          Services
        </Link>
        <Link
          to="/login"
          className="px-4 py-1 rounded-md bg-[#7E4BDE] text-white font-medium hover:bg-[#6c3fd6] transition duration-200"
        >
          Login
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden text-white">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <HiX className="text-3xl" />
          ) : (
            <HiMenuAlt3 className="text-3xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-[#1e1f38] px-6 py-5 flex flex-col gap-4 md:hidden text-white z-50">
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/service" onClick={() => setIsMenuOpen(false)}>
            Services
          </Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <span className="inline-block px-4 py-1 rounded-md bg-[#7E4BDE] text-white font-medium hover:bg-[#6c3fd6]">
              Login
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Homebar;
