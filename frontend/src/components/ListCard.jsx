import React, { useState } from "react";
import image from "../images/code.png";
import deleteImg from "../images/delete.png";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";

const ListCard = ({ item }) => {
  const navigate = useNavigate();
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      <div className="listCard mb-2 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-[10px] bg-[#252746] cursor-pointer rounded-lg">
        <div
          onClick={() => navigate(`/editor/${item._id}`)}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <img className="w-[60px] sm:w-[80px]" src={image} alt="code" />
          <div className="mt-2 sm:mt-0">
            <h3 className="text-[18px] sm:text-[20px]">{item.title}</h3>
            <p className="text-[grey] text-[12px] sm:text-[13px]">
              Created in {new Date(item.date).toDateString()}
            </p>
          </div>
        </div>
        <div className="self-end sm:self-center sm:mr-4 mt-2 sm:mt-0">
          <img
            onClick={() => setIsDeleteModelShow(true)}
            className="w-[25px] sm:w-[30px] cursor-pointer"
            src={deleteImg}
            alt="delete"
          />
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-[50]">
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

export default ListCard;
