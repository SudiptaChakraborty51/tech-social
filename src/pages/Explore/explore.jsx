import React, { useContext, useState } from "react";
import "./explore.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { DataContext } from "../../contexts/dataContext";
import PostCard from "../../components/PostCard/postCard";
import { sortOptions, getSortedPosts } from "../../utils/sortPosts";

const Explore = () => {
  document.title = "tech-social | Explore";
  const { dataState } = useContext(DataContext);

  const [sortByOption, setSortByOption] = useState("Latest");

  const sortedPosts = getSortedPosts(dataState?.posts, sortByOption);

  return (
    <div className="explore">
      <Navbar />
      <div className="explore-content">
        <LeftSideBar />
        <div className="explore-main">
          {dataState.postsLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="sort-post">
                <h3>{sortOptions[sortByOption]}</h3>
                <select onChange={(e) => setSortByOption(e.target.value)}>
                  {Object.keys(sortOptions).map((option) => (
                    <option value={option} key={option}>{option}</option>
                  ))}
                </select>
              </div>
              {sortedPosts?.map((post) => (
                <div key={post?._id}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Explore;
