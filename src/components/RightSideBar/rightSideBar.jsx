import React from "react";
import "./rightSideBar.css";
import SuggestedUser from "../SuggestedUser/suggestedUser";
import SearchBar from "../SearchBar/searchBar";

const RightSideBar = () => {
  return (
    <div className="right-sidebar">
      <SearchBar />
      <div className="suggested-users">
        <h4>Suggestions for you</h4>
        <SuggestedUser />
      </div>
    </div>
  );
};

export default RightSideBar;
