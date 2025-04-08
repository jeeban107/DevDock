import React from "react";
import logo from "../images/DDlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import image from "../images/SImg.png";
import { api_base_url } from "../helper";

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
          navigate("/");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px] ">
        <div className="left w-[35%]">
          <img className="w-[200px]" src={logo} alt="" />
          <form onSubmit={submitForm} className="w-full mt-[50px]" action="">
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
              Don't have an account{"  "}
              <Link to="/signUp" className="text-[#7E4BDE]">
                SignUp
              </Link>{" "}
            </p>

            <p className="text-red-500 text-[14px] my-2">{error}</p>

            <button className="btnBlue w-full mt-[20px] ">Login</button>
          </form>
        </div>
        <div className="right  w-[50%]">
          <img src={image} alt="" className="h-[90vh]  object-cover " />
        </div>
      </div>
    </>
  );
};

export default Login;
