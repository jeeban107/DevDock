import React from "react";
import logo from "../images/DDlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import image from "../images/SImg.png";
import { api_base_url } from "../helper";
import Footer from "../components/Footer";
import SubSection from "../components/SubSection";
import EditorNavbar from "../components/Navbar";
import Homebar from "../components/Homebar";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          alert("Account created successfully"); //redirect to login page
          navigate("/login");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <Homebar></Homebar>
      <div className="container w-screen min-h-screen pt-[100px] flex items-center justify-between pl-[100px] pr-[50px] pb-[40px]">
        {/* LEFT SECTION */}
        <div className="left w-[35%] ">
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-[#7E4BDE]">DevDock</span>
          </h1>
          <p className="text-[14px] text-[#dde2fa] mb-6">
            Your ultimate collaborative code editor. Create, code, and
            collaborate in real-time — whether you're building projects,
            debugging code, or just learning!
          </p>

          <form onSubmit={submitForm} className="w-full" action="">
            <div className="inputBox">
              <input
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="UserName"
              />
            </div>
            <div className="inputBox">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="inputBox">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="inputBox">
              <input
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type="password"
                placeholder="Password"
              />
            </div>
            <p className="text-[grey]">
              Already have an account{" "}
              <Link to="/login" className="text-[#7E4BDE]">
                login
              </Link>
            </p>
            <p className="text-red-500 text-[14px] my-2">{error}</p>
            <button className="btnBlue w-full mt-[20px]">Sign Up</button>
          </form>
        </div>

        {/* RIGHT SECTION */}
        <div className="right w-[50%]">
          <img
            src={image}
            alt="Signup Illustration"
            className="h-[90vh] object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>

      <SubSection />
      <Footer></Footer>
    </>
  );
};

export default SignUp;
