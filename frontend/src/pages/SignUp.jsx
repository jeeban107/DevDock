import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/SImg.png";
import { api_base_url } from "../helper";
import Footer from "../components/Footer";
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
        username,
        name,
        email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          alert("Account created successfully");
          navigate("/login");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <Homebar />
      <div className="w-full min-h-screen pt-[80px] px-4 md:px-10 lg:px-24 pb-10 flex flex-col md:flex-row-reverse items-center justify-center gap-10">
        {/* RIGHT SECTION (Image) */}
        <div className="w-full md:w-[50%] lg:w-[50%] flex justify-center items-center">
          <img
            src={image}
            alt="Signup Illustration"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[90vh] object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* LEFT SECTION (Form) */}
        <div className="w-full md:w-[50%] lg:w-[40%]">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-[#7E4BDE]">DevDock</span>
          </h1>
          <p className="text-sm sm:text-[14px] text-[#dde2fa] mb-6">
            Your ultimate collaborative code editor. Create, code, and
            collaborate in real-time — whether you're building projects,
            debugging code, or just learning!
          </p>

          <form onSubmit={submitForm} className="w-full">
            <div className="inputBox">
              <input
                required
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              Already have an account?{" "}
              <Link to="/login" className="text-[#7E4BDE] font-medium">
                Login
              </Link>
            </p>

            <p className="text-red-500 text-sm my-2">{error}</p>

            <button className="btnBlue w-full mt-5">Sign Up</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
