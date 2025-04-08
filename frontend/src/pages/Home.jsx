import React, { useEffect, useState } from "react";
import { api_base_url } from "../helper.js";
import Navbar from "../components/Navbar.jsx";
import ListCard from "../components/ListCard.jsx";
import GridCard from "../components/GridCard.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isGridLayout, setisGridLayout] = useState(true);

  const [projTitle, setProjTitle] = useState("");

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [isCreateModelShow, setIsCreateModelShow] = useState(false);

  const createProj = (e) => {
    if (projTitle === "") {
      alert("Please Enter Project Title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsCreateModelShow(false);
            setProjTitle("");
            alert("Project Created Successfully");
            navigate(`/editor/${data.projectId}`);
          } else {
            alert("Something Went Wrong");
          }
        });
    }
  };

  const getProj = () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.projects);
        } else {
          setError(data.message);
        }
      });
  };
  useEffect(() => {
    getProj();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="flex items-center justify-between px-[120px] my-[40px]">
        <h2 className="text-3xl">Hi, Jeeban👋 </h2>
        <div className="flex items-center gap-2">
          <div className="inputBox !w-[350px]">
            <input
              type="text"
              placeholder="Search Here                                                 🔍"
            />
          </div>
          <button
            onClick={() => {
              setIsCreateModelShow(true);
            }}
            className="btnBlue rounded-[5px] mb-9 !text-[20px] !p-[5px] !px-[12px] "
          >
            +
          </button>
        </div>
      </div>

      <div className="cards ">
        {isGridLayout ? (
          <div className="grid px-[120px]">
            {data
              ? data.map((item, index) => {
                  return <GridCard key={index} item={item} />;
                })
              : ""}
            {/* <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard /> */}
          </div>
        ) : (
          <div className="list px-[120px]">
            {data
              ? data.map((item, index) => {
                  return <ListCard key={index} item={item} />;
                })
              : ""}
          </div>
        )}
      </div>

      {isCreateModelShow ? (
        <div className="createModelCon  fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.1)] flex items-center justify-center">
          <div className="createModel bg-[#3F4273] w-[25vw] h-[35vh] shadow-black/50 rounded-[10px] p-[20px]">
            <h3 className="text-2xl">Create New Project</h3>
            <div className="inputBox mt-4 !bg-[#7376B1] !mb-[2px] ">
              <input
                onChange={(e) => {
                  setProjTitle(e.target.value);
                }}
                value={projTitle}
                type="text"
                placeholder="Project title.."
              />
            </div>
            <div className="flex items-center gap-[10px] w-full mt-2">
              <button
                onClick={createProj}
                className="btnBlue w-[49%] rounded-[5px] mb-4 text-[20px] !p-[5px] !px-[10px] !py-[10px]"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsCreateModelShow(false);
                }}
                className="btnBlue w-[49%] !bg-[#7275a4] rounded-[5px] mb-4 text-[20px] !p-[5px] !px-[10px] !py-[10px]"
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

export default Home;
