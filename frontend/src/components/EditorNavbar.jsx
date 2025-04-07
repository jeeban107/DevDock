import React from "react";
import logo from "../images/DDlogo.png";
import { MdFileDownload } from "react-icons/md";

const EditorNavbar = () => {
  return (
    <>
      <div className="EditorNavbar flex  items-center justify-between px-[100px] h-[70px] bg-[#482A81] ">
        <div className="logo">
          <img
            className="pl-[10px] w-[160px] cursor-pointer"
            src={logo}
            alt=""
          />
        </div>
        <p>
          File / <span className="text-[gray]"> My First Project</span>{" "}
        </p>
        <i className=" btn p-[5px] bg-[#252746] rounded-[5px] cursor-pointer text-[18px] p-[8px]">
          <MdFileDownload />
        </i>
      </div>
    </>
  );
};

export default EditorNavbar;
