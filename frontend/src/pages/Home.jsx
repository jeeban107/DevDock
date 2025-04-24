import React, { useEffect, useState } from "react";
import { api_base_url } from "../helper.js";
import Navbar from "../components/Navbar.jsx";
import ListCard from "../components/ListCard.jsx";
import GridCard from "../components/GridCard.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projTitle, setProjTitle] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [isGridLayout, setisGridLayout] = useState(false);
  const [userdata, setUserData] = useState(null);

  const navigate = useNavigate();

  const filteredData = data
    ? data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const createProj = () => {
    if (projTitle === "") {
      alert("Please Enter Project Title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setData(data.projects);
        else setError(data.message);
      });
  };

  useEffect(() => {
    getProj();
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUserData(data.user);
      });
  }, []);

  return (
    <>
      <Navbar isGridLayout={isGridLayout} setisGridLayout={setisGridLayout} />
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-[120px] my-[40px] gap-4">
        <h2 className="text-2xl md:text-3xl">Hi, biki3 👋</h2>

        <div className="flex items-center justify-between gap-2 w-full sm:w-auto md:w-fit">
          <div className="inputBox  w-full sm:w-[300px] !mb-0">
            <input
              type="text"
              placeholder="Search Here 🔍"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsCreateModelShow(true)}
            className="btnBlue rounded-md text-[18px] px-4 py-2 !mt-0"
          >
            +
          </button>
        </div>
      </div>

      <div className="cards px-4 md:px-[120px]">
        {isGridLayout ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <GridCard key={index} item={item} />
              ))
            ) : (
              <p>No Project found!</p>
            )}
          </div>
        ) : (
          <div className="list">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <ListCard key={index} item={item} />
              ))
            ) : (
              <p>No Project found!</p>
            )}
          </div>
        )}
      </div>

      {isCreateModelShow && (
        <div className="createModelCon fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex items-center justify-center z-50">
          <div className="createModel bg-[#3F4273] w-[90vw] sm:w-[25vw] h-[35vh] rounded-lg p-[20px]">
            <h3 className="text-xl sm:text-2xl">Create New Project</h3>
            <div className="inputBox mt-4 bg-[#7376B1] mb-2">
              <input
                onChange={(e) => setProjTitle(e.target.value)}
                value={projTitle}
                type="text"
                placeholder="Project title.."
              />
            </div>
            <div className="flex items-center gap-3 w-full mt-4">
              <button
                onClick={createProj}
                className="btnBlue w-[49%] rounded-md text-[16px] py-2"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreateModelShow(false)}
                className="btnBlue !bg-[#7275a4] w-[49%] rounded-md text-[16px] py-2"
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

export default Home;
