import React, { useContext } from "react";
import "./explore.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { AuthContext } from "../../contexts/authContext";
import { DataContext } from "../../contexts/dataContext";
import PostCard from "../../components/PostCard/postCard";

const Explore = () => {
  document.title = "tech-social | Explore";
  const { authState } = useContext(AuthContext);
  const { dataState, postsLoading } = useContext(DataContext);

  return (
    <div className="explore">
      <Navbar />
      <div className="explore-content">
        <LeftSideBar />
        <div className="explore-main">
          {postsLoading ? (
            <p>Loading...</p>
          ) : (
            dataState?.posts?.map((post) => (
              <div key={post?._id}>
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>
        {authState?.token && <RightSideBar />}
      </div>
    </div>
  );
};

export default Explore;
