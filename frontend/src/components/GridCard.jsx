import React, { useState } from "react";
import codeImg from "../images/code.png";
import delImg from "../images/delete.png";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";

const GridCard = ({ item }) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();

  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progId: id,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsDeleteModelShow(false);
          window.location.reload();
        } else {
          alert(data.message);
          setIsDeleteModelShow(false);
        }
      });
  };

  return (
    <>
      <div className="gridCard w-full max-w-[220px] sm:max-w-[180px] h-[160px] p-[10px] rounded-lg shadow-black/50 bg-[#252746] m-2">
        <div
          onClick={() => navigate(`/editor/${item._id}`)}
          className="cursor-pointer"
        >
          <img className="w-[60px] sm:w-[50px]" src={codeImg} alt="code" />
          <h3 className="text-[18px] sm:text-[16px] w-[90%] truncate mt-1">
            {item.title}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[12px] text-[grey] sm:text-[10px]">
            {new Date(item.date).toDateString()}
          </p>
          <img
            onClick={() => setIsDeleteModelShow(true)}
            src={delImg}
            className="w-[20px] cursor-pointer"
            alt="delete"
          />
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-[50]">
          <div className="mainModel w-[90vw] sm:w-[30vw] h-[28vh] rounded-lg p-[10px] bg-[#3F4273]">
            <h3 className="text-xl sm:text-3xl">
              Do you want to delete <br /> this project?
            </h3>
            <div className="flex w-full mt-5 items-center gap-[10px]">
              <button
                onClick={() => deleteProj(item._id)}
                className="p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer w-[49%]"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModelShow(false)}
                className="p-[10px] rounded-lg bg-[#7251AF] text-white cursor-pointer w-[49%]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GridCard;
