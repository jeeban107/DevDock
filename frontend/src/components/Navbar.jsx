import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/DDlogo.png";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { api_base_url, toggleClass } from "../helper";

const Navbar = ({ isGridLayout, setisGridLayout }) => {
  const [data, setData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.success ? setData(data.user) : console.error(data.message)
      );
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar flex items-center justify-between px-4 md:px-[100px] h-[70px] bg-[#1e1f38] relative">
      <div className="logo">
        <img className="w-[140px] cursor-pointer" src={logo} alt="logo" />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-7 text-white">
        <Link
          className="text-white hover:text-[#7E4BDE] transition duration-200"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-white hover:text-[#7E4BDE] transition duration-200"
          to="/about"
        >
          About
        </Link>
        <Link
          className="text-white hover:text-[#7E4BDE] transition duration-200"
          to="/service"
        >
          Services
        </Link>
        <button
          onClick={logout}
          className="btnRed !bg-red-500 min-w-[100px] ml-2 hover:!bg-red-600"
        >
          Logout
        </button>
        <Avatar
          onClick={() => toggleClass(".dropDownNavbar", "hidden")}
          name={data?.name || ""}
          size="40"
          round
          className="cursor-pointer ml-2"
        />
      </div>

      {/* Hamburger Icon */}
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
        <div className="absolute top-[70px] left-0 w-full bg-[#1e1f38] p-5 flex flex-col gap-4 z-50 md:hidden text-white">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/service" onClick={() => setIsMenuOpen(false)}>
            Services
          </Link>
          <button
            onClick={logout}
            className="btnRed !bg-red-500 min-w-[100px] hover:!bg-red-600"
          >
            Logout
          </button>
          <div className="flex items-center gap-2 mt-2">
            <Avatar name={data?.name || ""} size="40" round />
            <span>{data?.name}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <MdLightMode className="text-[22px]" />
            <span>Light Mode</span>
          </div>
          <div
            onClick={() => setisGridLayout(!isGridLayout)}
            className="flex items-center gap-2 mt-2 cursor-pointer"
          >
            <BsGridFill className="text-[22px]" />
            <span>{isGridLayout ? "List" : "Grid"} Layout</span>
          </div>
        </div>
      )}

      {/* Dropdown Menu (Desktop only) */}
      <div className="dropDownNavbar hidden absolute right-[20px] top-[70px] rounded-lg p-[10px] shadow-lg bg-[#482A81] w-[150px] h-[145px] z-50 text-white">
        <div className="py-[10px] border-b border-white">
          <h3 className="text-[17px] line-clamp-2">{data?.name || ""}</h3>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <MdLightMode className="text-[22px]" />
          <span>Light Mode</span>
        </div>
        <div
          onClick={() => setisGridLayout(!isGridLayout)}
          className="flex items-center gap-2 mt-3 cursor-pointer"
        >
          <BsGridFill className="text-[22px]" />
          <span>{isGridLayout ? "List" : "Grid"} Layout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
