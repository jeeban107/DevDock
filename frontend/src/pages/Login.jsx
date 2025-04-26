import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/DDlogo.png";
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
      body: JSON.stringify({ email, password: pwd }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          navigate("/home");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <Homebar />
      <div className="w-full min-h-screen pt-[80px] px-4 md:px-10 lg:px-24 pb-10 flex flex-col md:flex-row-reverse items-center justify-center gap-10">
        {/* RIGHT SECTION (Image shown on top for mobile, right side on desktop) */}
        <div className="w-full md:w-[50%] lg:w-[50%] flex justify-center items-center">
          <img
            src={image}
            alt="Login Illustration"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[90vh] object-contain rounded-xl "
          />
        </div>

        {/* LEFT SECTION (Form shown below image in mobile, left side on desktop) */}
        <div className="w-full md:w-[50%] lg:w-[40%]">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            Welcome Back to <span className="text-[#7E4BDE]">DevDock</span>
          </h1>
          <p className="text-sm sm:text-[14px] text-[#dde2fa] mb-6">
            Continue your coding journey with DevDock. Access your projects,
            collaborate with others, and transform your ideas into reality with
            our powerful collaborative environment.
          </p>

          <form onSubmit={submitForm} className="w-full">
            <div className="inputBox">
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <input
                required
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
            <p className="text-[grey] text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#7E4BDE] font-medium">
                Sign Up
              </Link>
            </p>

            <p className="text-red-500 text-sm my-2">{error}</p>

            <button className="btnBlue w-full mt-5">Login</button>
          </form>
        </div>
      </div>

      <SubSection />
      <Footer />
    </>
  );
};

export default Login;
