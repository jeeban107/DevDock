import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/DDlogo.png";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { toggleClass } from "../helper";

const Navbar = () => {
  return (
    <>
      <div className="navbar flex  items-center justify-between px-[100px] h-[70px] bg-[#482A81] ">
        <div className="logo">
          <img
            className="pl-[10px] w-[160px] cursor-pointer"
            src={logo}
            alt=""
          />
        </div>
        <div className="links flex items-center gap-7">
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Contact</Link>
          <Link>Services</Link>
          <Avatar
            onClick={() => {
              toggleClass(".dropDownNavbar", "hidden");
            }}
            name="Jeeban Behera"
            size="40"
            round="50%"
            className="cursor-pointer ml-2"
          />
        </div>
        <div className="dropDownNavbar hidden absolute right-[60px] top-[70px] rounded-lg  p-[10px] shadow-lg shadow-black/50  bg-[#482A81] w-[150px] h-[145px]">
          <div className="py-[10px] border-b-[1px] border-b-[#fff]">
            <h3 className="text-[17px] line-clamp-2" style={{ lineHeight: 1 }}>
              Jeeban Behera
            </h3>
          </div>
          <i
            className="flex items-center gap-2 mt-3 mb2"
            style={{ fontStyle: "normal" }}
          >
            <MdLightMode className="text-[22px]" />
            Light Mode
          </i>
          <i
            className="flex items-center gap-2 mt-3 mb2"
            style={{ fontStyle: "normal" }}
          >
            <BsGridFill className="text-[22px]" />
            Grid Layout
          </i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
