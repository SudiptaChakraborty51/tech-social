import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";
import "./suggestedUser.css";
import { useNavigate } from "react-router-dom";

const SuggestedUser = () => {
  const { dataState } = useContext(DataContext);
  const { localStorageData } = useContext(AuthContext);

  const suggestedUser = dataState?.users?.filter(
    (user) => user?.username !== localStorageData?.user?.username
  );

  const navigate = useNavigate();

  return (
    <div>
      {dataState.usersLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="suggested-users-main">
          {suggestedUser?.length > 0 &&
            suggestedUser?.map(
              ({ _id, firstName, lastName, username, profileAvatar }) => {
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
                    <button>Follow</button>
                  </li>
                );
              }
            )}
        </div>
      )}
    </div>
  );
};

export default SuggestedUser;
