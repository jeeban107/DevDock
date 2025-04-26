import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/DDlogo.png";
import { HiMenu, HiX } from "react-icons/hi";

const EditorNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCollabClick = () => {
    navigate("/collabhome");
  };

  return (
    <div className="EditorNavbar bg-[#1e1f38] text-white px-6 md:px-[100px] h-[70px] flex items-center justify-between relative">
      {/* Logo */}
      <div className="logo">
        <img className="w-[160px] cursor-pointer" src={logo} alt="logo" />
      </div>

      {/* Hamburger Icon (for small screens) */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`absolute md:static top-[70px] right-0 w-full md:w-auto bg-[#1e1f38] md:flex items-center gap-4 px-6 md:px-0 transition-all duration-300 ease-in-out z-50 ${
          menuOpen ? "flex flex-col md:flex-row py-4" : "hidden md:flex"
        }`}
      >
        <button
          onClick={handleCollabClick}
          className="px-4 py-2 bg-[#5E3E9B] hover:bg-[#6A4BAF] rounded-[5px] text-white text-sm font-medium"
        >
          Collaboration Mode
        </button>
      </div>
    </div>
  );
};

export default EditorNavbar;
