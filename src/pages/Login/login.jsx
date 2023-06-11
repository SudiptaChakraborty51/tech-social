import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [isPasswordHide, setIsPasswordHide] = useState(true);

  return (
      <div className="login">
        <div className="login-logo"><img src={logo} alt="logo"/><h2>tech-social</h2></div>
        <p>Social media for programmers</p>
        <h2>Login</h2>
        <form>
          <div className="login-form-div">
            <label for="email">Email Address <span>*</span></label>
            <input
              id="email"
              type="email"
              placeholder="test@gmail.com"
              required
            />
          </div>

          <div className="login-form-div">
            <label for="password">Password <span>*</span></label>
            <div className="password-wrapper">
              <input
                id="password"
                type={isPasswordHide ? "password" : "text"}
                placeholder={isPasswordHide ? "********" : "Enter password"}
                required
              />
              <span
                onClick={() =>
                  setIsPasswordHide((isPasswordHide) => !isPasswordHide)
                }
              >
                {isPasswordHide ? (
                  <i class="fa-regular fa-eye-slash"></i>
                ) : (
                  <i class="fa-regular fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          <button className="login-button">
            Login
          </button>
          <button className="login-button guest">
            Login As Guest
          </button>
        </form>

        <p onClick={() => navigate("/signup")} className="create-new-account-link">
          Create New account <i class="fa-solid fa-angle-right"></i>
        </p>
      </div>
  );
};

export default Login;
