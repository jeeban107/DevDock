import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/DDlogo.png";
import { MdFileDownload } from "react-icons/md";

const EditorNavbar = () => {
  const navigate = useNavigate();

  const handleCollabClick = () => {
    navigate("/collabhome"); // Route path you'll define later for CollabHomepage
  };

  return (
    <div className="EditorNavbar flex items-center justify-between px-[100px] h-[70px] bg-[#1e1f38] text-white">
      <div className="logo">
        <img
          className="pl-[10px] w-[160px] cursor-pointer"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="flex items-center gap-4">
        <p>
          File / <span className="text-[gray]">My First Project</span>
        </p>
        <button
          onClick={handleCollabClick}
          className="px-4 py-2 bg-[#5E3E9B] hover:bg-[#6A4BAF] rounded-[5px] text-white text-sm font-medium"
        >
          Collaboration Mode
        </button>
      </div>
      <i className="btn p-[8px] bg-[#252746] rounded-[5px] cursor-pointer text-[18px]">
        <MdFileDownload />
      </i>
    </div>
  );
};

export default EditorNavbar;
