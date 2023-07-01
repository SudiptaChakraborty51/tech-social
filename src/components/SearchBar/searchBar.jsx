import React, { useContext, useState } from "react";
import "./searchBar.css";
import { DataContext } from "../../contexts/dataContext";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const { dataState, darkMode } = useContext(DataContext);

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setSearchInput(e.target.value);
    const filteredResults = dataState?.users?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedUsers(filteredResults);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchedUsers([]);
  };

  return (
    <div>
      <div className={`search-bar ${darkMode && "bgSecondaryDarkMode"}`}>
        <input
          type="text"
          className={`${darkMode && "bgSecondaryDarkMode"}`}
          placeholder="Search Users"
          value={searchInput}
          onChange={inputChangeHandler}
        />
        {searchInput.trim().length === 0 ? (
          <i className="fa-solid fa-magnifying-glass"></i>
        ) : (
          <i className="fa-solid fa-xmark" onClick={clearSearch}></i>
        )}
      </div>
      <div className="search-main-container">
      {searchedUsers.length > 0 && searchInput.trim().length > 0 ? (
        <div className={`searched-users-container ${darkMode && "bgDarkmode"}`}>
          {searchedUsers?.map(
            ({ _id, firstName, lastName, username, profileAvatar }) => {
              return (
                <li key={_id} className="searched-user">
                  <div
                    className="searched-user-name-profile"
                    onClick={() => {
                      navigate(`/profile/${username}`);
                      clearSearch();
                    }}
                  >
                    <img
                      className="user-avatar"
                      src={
                        profileAvatar ||
                        `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
                      }
                      alt="avatar"
                    />
                    <div className="searchedUser-name">
                      <span>
                        {firstName} {lastName}
                      </span>
                      <small>@{username}</small>
                    </div>
                  </div>
                </li>
              );
            }
          )}
        </div>
      ) : (
        searchInput.trim().length > 0 && (
          <div className={`searched-users-container ${darkMode && "bgDarkmode"}`}>
            <p>User not found!</p>
          </div>
        )
      )}
      </div>
    </div>
  );
};

export default SearchBar;
