import React from "react";
import "./rightSideBar.css";
import SuggestedUser from "../SuggestedUser/suggestedUser";

const RightSideBar = () => {
  return (
    <div className="right-sidebar">
      <div className="search-bar">
        <input type="text" placeholder="Search Users" />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="suggested-users">
        <h4>Suggestions for you</h4>
        <SuggestedUser />
      </div>
    </div>
  );
};

export default RightSideBar;
