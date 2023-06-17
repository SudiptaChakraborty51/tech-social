import React, { useContext } from "react";
import "./bookmarks.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { DataContext } from "../../contexts/dataContext";
import PostCard from "../../components/PostCard/postCard";

const Bookmarks = () => {
  document.title = "tech-social | Bookmarks";

  const { dataState } = useContext(DataContext);

  const getBookmarkPosts = (postId) =>
    dataState?.posts?.filter((post) => post._id === postId)[0];

  return (
    <div className="bookmarks">
      <Navbar />
      <div className="bookmarks-content">
        <LeftSideBar />
        <div className="bookmarks-main">
          {dataState?.bookmarks?.length === 0 ? (
            <h3>No Bookmarks Yet</h3>
          ) : (
            dataState?.bookmarks.map((post) => (
              <PostCard key={post._id} post={getBookmarkPosts(post)} />
            ))
          )}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Bookmarks;
