import React, { useContext } from "react";
import "./leftSideBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const LeftSideBar = () => {
  const { userLogout } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();

  const getActiveStyle = ({ isActive }) => ({
    color: isActive && "var(--white-color)",
    backgroundColor: isActive && "var(--primary-color)"
  });

  return (
    <div className="left-sidebar">
      <NavLink to="/home" className="left-sidebar-items" style={getActiveStyle}>
        <i class="fa-solid fa-house"></i> <span>Home</span>
      </NavLink>
      <NavLink
        to="/explore"
        className="left-sidebar-items"
        style={getActiveStyle}
      >
        <i class="fa-solid fa-compass"></i> <span>Explore</span>
      </NavLink>
      <NavLink
        to="/bookmarks"
        className="left-sidebar-items"
        style={getActiveStyle}
      >
        <i class="fa-solid fa-bookmark"></i> <span>Bookmarks</span>
      </NavLink>
      <NavLink
        to="/liked-posts"
        className="left-sidebar-items"
        style={getActiveStyle}
      >
        <i class="fa-solid fa-heart"></i> <span>Liked Posts</span>
      </NavLink>
      <NavLink
        to="/profile"
        className="left-sidebar-items"
        style={getActiveStyle}
      >
        <i class="fa-solid fa-user"></i> <span>Profile</span>
      </NavLink>
      {authState?.token ? (
        <p onClick={() => userLogout()} className="left-sidebar-items">
          <i class="fa-solid fa-right-from-bracket"></i> <span>Logout</span>
        </p>
      ) : (
        <p onClick={() => navigate("/login")} className="left-sidebar-items">
          <i class="fa-solid fa-right-to-bracket"></i> <span>Login</span>
        </p>
      )}
      <button
        className="create-post-btn"
        style={{ cursor: !authState?.token && "not-allowed" }}
        disabled={!authState?.token && true}
      >
        Create New Post
      </button>
    </div>
  );
};

export default LeftSideBar;
