import React from "react";
import "./bookmarks.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";

const Bookmarks = () => {
  document.title = "tech-social | Bookmarks";
  return (
    <div className="bookmarks">
      <Navbar />
      <div className="bookmarks-content">
        <LeftSideBar />
        <div className="bookmarks-main">Bookmarks</div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Bookmarks;
