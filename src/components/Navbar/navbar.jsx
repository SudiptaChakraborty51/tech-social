import React, { useContext } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";
import SearchBar from "../SearchBar/searchBar";

const Navbar = () => {
  const { authState } = useContext(AuthContext);
  const { dataState } = useContext(DataContext);

  const navigate = useNavigate();
  return (
    <div className="navbar">
      <nav>
        <div className="left-nav" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <h2>tech-social</h2>
        </div>
        <div className="right-nav">
          <div className="searchBar">
          <SearchBar />
          </div>
          <i className="fa-solid fa-moon"></i>
          {authState?.token && (
            <img
              onClick={() => {
                navigate(`/profile/${authState?.user?.username}`);
              }}
              src={
                dataState?.users?.find(
                  (user) => user._id === authState?.user?._id
                )?.profileAvatar ||
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
