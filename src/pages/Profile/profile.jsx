import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { DataContext } from "../../contexts/dataContext";
import axios from "axios";
import PostCard from "../../components/PostCard/postCard";

const Profile = () => {
  document.title = "tech-social | Profile";

  const { username } = useParams();
  const { authState } = useContext(AuthContext);
  const { dataState } = useContext(DataContext);

  const [profileData, setProfileData] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const getUserDetails = async () => {
    try {
      const { data, status } = await axios.get(`/api/users/${username}`);
      if (status === 200) {
        setProfileData(data?.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUserPost = async () => {
    try {
      const { data, status } = await axios.get(`/api/posts/user/${username}`);
      if (status === 200) {
        setUserPosts(data?.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserDetails();
    getUserPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, dataState?.posts, dataState?.users]);

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-content">
        <LeftSideBar />
        <div className="profile-main">
          <div>
            <div className="profile-container">
              <div className="profile-container-header">
                <div className="profile-name-avatar">
                  <img
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    src={
                      profileData?.profileAvatar ||
                      `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
                    }
                    alt="avatar"
                  />
                  <div>
                    <h3>
                      {profileData?.firstName} {profileData?.lastName}
                    </h3>
                    <small>@{profileData?.username}</small>
                  </div>
                </div>
                {profileData?.username === authState?.user?.username ? (
                  <button className="edit-button">
                    <i className="fa-solid fa-pen fa-md"></i>
                  </button>
                ) : (
                  <button className="follow-button">Follow</button>
                )}
              </div>
              {profileData?.bio && <p>{profileData?.bio}</p>}
              {profileData?.website && (
                <a href={profileData?.website} target="_blank" rel="noreferrer">
                  {profileData?.website}
                </a>
              )}
              <p>
                <i class="fa-solid fa-calendar"></i> Joined{" "}
                {`${new Date(profileData?.createdAt)
                  .toDateString()
                  .split(" ")
                  .slice(1, 4)
                  .join(" ")}`}
              </p>
              <div className="profile-post-follow-details">
                <p>
                  {userPosts?.length}{" "}
                  {`${userPosts?.length > 1 ? "Posts" : "Post"}`}
                </p>
                <p>
                  {profileData?.followers?.length}{" "}
                  {`${
                    profileData?.followers?.length > 1
                      ? "Followers"
                      : "Follower"
                  }`}
                </p>
                <p>
                  {profileData?.following?.length}{" "}
                  {`${
                    profileData?.following?.length > 1
                      ? "Followings"
                      : "Following"
                  }`}
                </p>
              </div>
            </div>
            <div>
              {userPosts.length > 0 &&
                userPosts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
            </div>
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Profile;
