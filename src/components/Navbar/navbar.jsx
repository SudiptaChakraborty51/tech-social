import React, { useContext } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <nav>
        <div className="left-nav" onClick={() => navigate("/home")}>
          <img src={logo} alt="logo" />
          <h2>tech-social</h2>
        </div>
        <div className="right-nav">
          <i class="fa-solid fa-moon"></i>
          <img src={authState?.user?.profileAvatar} alt="profile-pic" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
