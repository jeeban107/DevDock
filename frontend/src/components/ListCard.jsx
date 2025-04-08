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
      <div className="listCard mb-2 w-[full] flex items-center justify-between  p-[10px] bg-[#252746] cursor-pointer rounded-lg hover:bg-[]">
        <div
          onClick={() => {
            navigate(`/editor/${item._id}`);
          }}
          className="flex items-center gap-2"
        >
          <img className="w-[80px] " src={image} alt="" />
          <div>
            <h3 className="text-[20px] ">{item.title} </h3>
            <p className="text-[grey]  text-[14px]">
              Created in {new Date(item.date).toDateString()}
            </p>
          </div>
        </div>
        <div>
          <img
            onClick={() => {
              setIsDeleteModelShow(true);
            }}
            className="w-[30px] cursor-pointer mr-4 "
            src={deleteImg}
            alt=""
          />
        </div>
      </div>

      {isDeleteModelShow ? (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-[50]">
          <div className="mainModel w-[30vw] h-[28vh] z-[20] rounded-lg p-[10px]">
            <h3 className="text-3xl">
              Do you Want to delete <br />
              this project ?
            </h3>
            <div className="flex w-full mt-5 items-center gap-[10px]">
              <button
                onClick={() => {
                  deleteProj(item._id);
                }}
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
      ) : (
        ""
      )}
    </>
  );
};

export default ListCard;
