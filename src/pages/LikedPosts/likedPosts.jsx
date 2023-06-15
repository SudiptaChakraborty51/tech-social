import React from "react";
import "./likedPosts.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";

const LikedPosts = () => {
  document.title = "tech-social | Liked Posts";
  return (
    <div className="liked-posts">
      <Navbar />
      <div className="liked-posts-content">
        <LeftSideBar />
        <div className="liked-posts-main">Liked Posts</div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default LikedPosts;
