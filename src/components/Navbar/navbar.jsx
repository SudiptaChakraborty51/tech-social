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
          <i className="fa-solid fa-moon"></i>
          {authState?.token && (
            <img
              onClick={() => {
                navigate(`/profile/${authState?.user?.username}`);
              }}
              src={
                authState?.user?.profileAvatar ||
                `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
              }
              alt="profile-pic"
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
