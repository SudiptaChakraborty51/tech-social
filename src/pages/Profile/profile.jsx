import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { DataContext } from "../../contexts/dataContext";
import axios from "axios";
import PostCard from "../../components/PostCard/postCard";
import { isFollowed } from "../../utils/isFollowed";
import { unfollowUserHandler } from "../../utils/unfollowUserHandler";
import { followUserHandler } from "../../utils/followUserHandler";
import { toast } from "react-toastify";
import FollowModal from "../../components/FollowModal/followModal";
import EditProfileModal from "../../components/EditProfileModal/editProfileModal";
import { getPostDate } from "../../utils/getPostData";
import { getSortedPosts } from "../../utils/sortPosts";

const Profile = () => {
  document.title = "tech-social | Profile";

  const { username } = useParams();
  const { authState } = useContext(AuthContext);
  const { dataState, dataDispatch } = useContext(DataContext);

  const [profileData, setProfileData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const navigate = useNavigate();

  const [showFollowModal, setShowFollowModal] = useState({
    show: false,
    type: "",
  });

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
              {showFollowModal.show && (
                <FollowModal
                  data={
                    showFollowModal.type === "Following"
                      ? profileData?.following
                      : profileData?.followers
                  }
                  showFollowModal={showFollowModal}
                  setShowFollowModal={setShowFollowModal}
                />
              )}
              {editProfileModal && (
                <EditProfileModal
                  profileData={profileData}
                  editProfileModal={editProfileModal}
                  setEditProfileModal={setEditProfileModal}
                />
              )}
              <div className="profile-container-header">
                <div className="profile-name-avatar">
                  <img
                    className="avatar"
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
                    <i
                      className="fa-solid fa-pen fa-md"
                      onClick={() => setEditProfileModal(true)}
                    ></i>
                  </button>
                ) : (
                  <button
                    className={
                      isFollowed(dataState?.users, profileData?._id)
                        ? "following-button"
                        : "follow-button"
                    }
                    onClick={() => {
                      if (authState?.token) {
                        if (isFollowed(dataState?.users, profileData?._id)) {
                          unfollowUserHandler(
                            authState?.token,
                            profileData?._id,
                            dataDispatch
                          );
                        } else {
                          followUserHandler(
                            authState?.token,
                            profileData?._id,
                            dataDispatch
                          );
                        }
                      } else {
                        toast.error("Please login to follow");
                        navigate("/login");
                      }
                    }}
                  >
                    {isFollowed(dataState?.users, profileData?._id)
                      ? "Following"
                      : "Follow"}
                  </button>
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
                {getPostDate(profileData?.createdAt)}
              </p>
              <div className="profile-post-follow-details">
                <p>
                  {userPosts?.length}{" "}
                  {`${userPosts?.length > 1 ? "Posts" : "Post"}`}
                </p>
                <p
                  onClick={() =>
                    setShowFollowModal((prev) => ({
                      ...prev,
                      show: true,
                      type: "Followers",
                    }))
                  }
                >
                  {profileData?.followers?.length}{" "}
                  {`${
                    profileData?.followers?.length > 1
                      ? "Followers"
                      : "Follower"
                  }`}
                </p>
                <p
                  onClick={() =>
                    setShowFollowModal((prev) => ({
                      ...prev,
                      show: true,
                      type: "Following",
                    }))
                  }
                >
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
                getSortedPosts(userPosts, "Latest")?.map((post) => (
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
