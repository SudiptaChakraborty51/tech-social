import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";
import "./suggestedUser.css";
import { useNavigate } from "react-router-dom";
import { followUserHandler } from "../../utils/followUserHandler";
import { unfollowUserHandler } from "../../utils/unfollowUserHandler";
import { toast } from "react-toastify";
import { isFollowed } from "../../utils/isFollowed";

const SuggestedUser = () => {
  const { dataState, dataDispatch } = useContext(DataContext);

  const { authState } = useContext(AuthContext);

  const getSuggestedUsers = () => {
    const suggestedUser = dataState?.users?.filter(
      ({ username, followers }) => {
        if (username === authState?.user?.username) {
          return false;
        } else if (followers.length === 0) {
          return true;
        } else {
          return followers.some(
            ({ username }) => username !== authState?.user?.username
          );
        }
      }
    );
    return suggestedUser?.length > 3
      ? suggestedUser.splice(0, 3)
      : suggestedUser;
  };

  const navigate = useNavigate();

  return (
    <div>
      {dataState.usersLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="suggested-users-main">
          {getSuggestedUsers()?.length > 0 ? (
            getSuggestedUsers()?.map(
              ({ _id, firstName, lastName, username, profileAvatar }) => {
                console.log(isFollowed(dataState?.users, _id));
                return (
                  <li key={_id} className="suggested-user">
                    <div
                      className="suggested-user-name-profile"
                      onClick={() => {
                        navigate(`/profile/${username}`);
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
                      <div className="suggestedUser-name">
                        <span>
                          {firstName} {lastName}
                        </span>
                        <small>@{username}</small>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (authState?.token) {
                          if (isFollowed(dataState?.users, _id)) {
                            unfollowUserHandler(
                              authState?.token,
                              _id,
                              dataDispatch
                            );
                          } else {
                            followUserHandler(
                              authState?.token,
                              _id,
                              dataDispatch
                            );
                          }
                        } else {
                          toast.error("Please login to follow");
                          navigate("/login");
                        }
                      }}
                    >
                      {isFollowed(dataState?.users, _id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  </li>
                );
              }
            )
          ) : (
            <p>No suggested user is present.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestedUser;
