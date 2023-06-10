import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import header from "../../assets/header.svg";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-main">
      <img src={header} alt="header" className="header-image" />
      <div className="lending-right">
        <div className="landing-logo">
          <img src={logo} alt="logo" className="logo-image" />
          <p>Tech-Social</p>
        </div>
        <div className="landing-content">
          <p>
            <span>Follow</span>people around the globe
          </p>
          <p>
            <span>Connect</span>with yor friends
          </p>
          <p>
            <span>Share</span>what you are thinking
          </p>
        </div>
        <button className="join-now-btn" onClick={() => navigate("/signup")}>
          Join Now
        </button>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Landing;
