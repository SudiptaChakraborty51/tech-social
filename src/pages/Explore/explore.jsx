import React, { useContext, useState } from "react";
import "./explore.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { DataContext } from "../../contexts/dataContext";
import PostCard from "../../components/PostCard/postCard";
import { sortOptions, getSortedPosts } from "../../utils/sortPosts";
import ClipLoader from "react-spinners/ClipLoader";

const Explore = () => {
  document.title = "tech-social | Explore";
  const { dataState, darkMode } = useContext(DataContext);

  const [sortByOption, setSortByOption] = useState("Latest");

  const sortedPosts = getSortedPosts(dataState?.posts, sortByOption);

  return (
    <div className={`explore ${darkMode && "bgDarkmode"}`}>
      <Navbar />
      <div className="explore-content">
        <LeftSideBar />
        <div className="explore-main">
          {dataState.postsLoading ? (
            <ClipLoader color="var(--primary-dark)" size={60} />
          ) : (
            <div>
              <div className="sort-post">
                <h3>{sortOptions[sortByOption]}</h3>
                <select
                  onChange={(e) => setSortByOption(e.target.value)}
                  className={`${darkMode && "bgDarkmode"}`}
                >
                  {Object.keys(sortOptions).map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {sortedPosts?.map((post) => (
                  <PostCard post={post} key={post._id} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="rightSideBar">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default Explore;
