import React from "react";
import logo from "../images/DDlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import image from "../images/SImg.png";
import { api_base_url } from "../helper";
import Footer from "../components/Footer";
import SubSection from "../components/SubSection";
import Homebar from "../components/Homebar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          navigate("/home"); // Updated to redirect to /home instead of /
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
        <div className="left w-[35%]">
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Welcome Back to <span className="text-[#7E4BDE]">DevDock</span>
          </h1>
          <p className="text-[14px] text-[#dde2fa] mb-6">
            Continue your coding journey with DevDock. Access your projects,
            collaborate with others, and transform your ideas into reality with
            our powerful collaborative environment.
          </p>

          <form onSubmit={submitForm} className="w-full" action="">
            <div className="inputBox">
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="inputBox">
              <input
                required
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
                type="password"
                placeholder="Password"
              />
            </div>
            <p className="text-[grey]">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#7E4BDE]">
                Sign Up
              </Link>{" "}
            </p>

            <p className="text-red-500 text-[14px] my-2">{error}</p>

            <button className="btnBlue w-full mt-[20px]">Login</button>
          </form>
        </div>

        {/* RIGHT SECTION */}
        <div className="right w-[50%]">
          <img
            src={image}
            alt="Login Illustration"
            className="h-[90vh] object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>

      <SubSection />
      <Footer />
    </>
  );
};

export default Login;
