import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/DDlogo.png";

const Homebar = () => {
  return (
    <div className="w-full flex items-center justify-between px-10 py-4 bg-[#1e1f38] shadow-md fixed top-0 z-10">
      {/* Left - Logo */}
      <Link to="/signup" className="flex items-center gap-2">
        <img src={logo} alt="DevDock" className="h-10 w-auto" />
      </Link>

      {/* Right - Nav Links + Button */}
      <div className="flex items-center gap-6">
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
    </div>
  );
};

export default Homebar;
