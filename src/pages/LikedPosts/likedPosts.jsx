import React, { useContext, useEffect, useState } from "react";
import "./likedPosts.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { AuthContext } from "../../contexts/authContext";
import { DataContext } from "../../contexts/dataContext";
import PostCard from "../../components/PostCard/postCard";

const LikedPosts = () => {
  document.title = "tech-social | Liked Posts";

  const { authState } = useContext(AuthContext);
  const { dataState, postsLoading } = useContext(DataContext);
  const [postsLikedByUser, setPostsLikedByUser] = useState([]);

  useEffect(() => {
    setPostsLikedByUser(
      dataState?.posts?.filter((currPost) =>
        currPost.likes.likedBy.find(
          (currUser) => currUser.username === authState?.user?.username
        )
      )
    );
  }, [dataState?.posts]);

  return (
    <div className="liked-posts">
      <Navbar />
      <div className="liked-posts-content">
        <LeftSideBar />
        <div className="liked-posts-main">
          {postsLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {postsLikedByUser?.length === 0 ? (
                <h3>No liked Posts Yet</h3>
              ) : (
                <>
                  {postsLikedByUser?.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default LikedPosts;
