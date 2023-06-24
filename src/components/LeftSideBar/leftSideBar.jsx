import React, { useContext, useState } from "react";
import "./leftSideBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import PostModal from "../PostModal/postModal";

const LeftSideBar = () => {
  const { userLogout } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const navigate = useNavigate();

  const getActiveStyle = ({ isActive }) => ({
    color: isActive && "var(--white-color)",
    backgroundColor: isActive && "var(--primary-color)",
  });

  return (
    <div>
      <div className="left-sidebar">
        <NavLink to="/" className="left-sidebar-items" style={getActiveStyle}>
          <i className="fa-solid fa-house"></i> <span>Home</span>
        </NavLink>
        <NavLink
          to="/explore"
          className="left-sidebar-items"
          style={getActiveStyle}
        >
          <i className="fa-solid fa-compass"></i> <span>Explore</span>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className="left-sidebar-items"
          style={getActiveStyle}
        >
          <i className="fa-solid fa-bookmark"></i> <span>Bookmarks</span>
        </NavLink>
        <NavLink
          to="/liked-posts"
          className="left-sidebar-items"
          style={getActiveStyle}
        >
          <i className="fa-solid fa-heart"></i> <span>Liked Posts</span>
        </NavLink>
        <NavLink
          to={`/profile/${authState?.user?.username}`}
          className="left-sidebar-items"
          style={getActiveStyle}
        >
          <i className="fa-solid fa-user"></i> <span>Profile</span>
        </NavLink>
        {authState?.token ? (
          <p onClick={() => userLogout()} className="left-sidebar-items">
            <i className="fa-solid fa-right-from-bracket"></i> <span>Logout</span>
          </p>
        ) : (
          <p onClick={() => navigate("/login")} className="left-sidebar-items">
            <i className="fa-solid fa-right-to-bracket"></i> <span>Login</span>
          </p>
        )}
        <button
          className="create-post-btn"
          style={{ cursor: !authState?.token && "not-allowed" }}
          disabled={!authState?.token && true}
          onClick={() => setShowCreatePostModal((prev) => !prev)}
        >
          Create New Post
        </button>
      </div>
      {showCreatePostModal && (
        <PostModal
          setShowCreatePostModal={setShowCreatePostModal}
        />
      )}
    </div>
  );
};

export default LeftSideBar;
