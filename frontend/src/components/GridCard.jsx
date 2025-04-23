import React, { useState } from "react";
import codeImg from "../images/code.png";
import delImg from "../images/delete.png";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../helper"; // ✅ You missed this in GridCard

const GridCard = ({ item }) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();

  // ✅ Copying delete function from ListCard
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
      <div className="gridCard w-[220px] h-[150px] p-[10px] rounded-lg shadow-black/50">
        <div
          onClick={() => {
            navigate(`/editor/${item._id}`);
          }}
        >
          <img className="w-[80px]" src={codeImg} alt="" />
          <h3 className="text-[20px] w-[90%] line-clamp-1">{item.title}</h3>
        </div>
        <div className="flex items-center justify-between text-center">
          <p className="text-[12px] text-[grey]">
            Created in {new Date(item.date).toDateString()}
          </p>
          <img
            onClick={() => {
              setIsDeleteModelShow(true);
            }}
            src={delImg}
            className="w-[20px] cursor-pointer"
            alt="delete"
          />
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-[50]">
          <div className="mainModel w-[30vw] h-[28vh] z-[20] rounded-lg p-[10px]">
            <h3 className="text-3xl">
              Do you want to delete <br /> this project?
            </h3>
            <div className="flex w-full mt-5 items-center gap-[10px]">
              <button
                onClick={() => deleteProj(item._id)}
                className="p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setIsDeleteModelShow(false);
                }}
                className="p-[10px] rounded-lg bg-[#7251AF] text-white cursor-pointer min-w-[49%]"
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
