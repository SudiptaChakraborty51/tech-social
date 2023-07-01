import React, { useContext } from "react";
import "./rightSideBar.css";
import SuggestedUser from "../SuggestedUser/suggestedUser";
import SearchBar from "../SearchBar/searchBar";
import { DataContext } from "../../contexts/dataContext";

const RightSideBar = () => {
  const { darkMode } = useContext(DataContext);

  return (
    <div className={`right-sidebar ${darkMode && "bgDarkmode darkModeBorder"}`}>
      <SearchBar />
      <div className={`suggested-users ${darkMode && "bgSecondaryDarkMode"}`}>
        <h4>Suggestions for you</h4>
        <SuggestedUser />
      </div>
    </div>
  );
};

export default RightSideBar;
