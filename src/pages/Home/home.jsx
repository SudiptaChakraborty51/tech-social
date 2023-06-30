import React, { useContext, useState } from "react";
import "./home.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";
import PostCard from "../../components/PostCard/postCard";
import { sortOptions, getSortedPosts } from "../../utils/sortPosts";
import PostForm from "../../components/PostForm/postForm";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  document.title = "tech-social | Home";

  const { dataState } = useContext(DataContext);
  const { authState } = useContext(AuthContext);

  const loggedInUser = dataState?.users?.find(
    ({ username }) => username === authState?.user?.username
  );

  const postsOfFollowed = dataState?.posts?.filter(
    (post) =>
      loggedInUser?.following?.some(
        ({ username }) => username === post.username
      ) || authState?.user?.username === post.username
  );

  const [sortByOption, setSortByOption] = useState("Latest");

  const sortedPosts = getSortedPosts(postsOfFollowed, sortByOption);

  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <LeftSideBar />
        <div className="home-main">
          <PostForm />
          {dataState?.postsLoading ? (
            <ClipLoader color="var(--primary-dark)" size={60} />
          ) : postsOfFollowed?.length === 0 ? (
            <h3>No Posts to Display!</h3>
          ) : (
            <div>
              <div className="sort-post">
                <h3>{sortOptions[sortByOption]}</h3>
                <select onChange={(e) => setSortByOption(e.target.value)}>
                  {Object.keys(sortOptions).map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {sortedPosts?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
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

export default Home;
