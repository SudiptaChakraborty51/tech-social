import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";
import "./suggestedUser.css";

const SuggestedUser = () => {
  const { dataState } = useContext(DataContext);
  const { localStorageData } = useContext(AuthContext);

  const suggestedUser = dataState?.users?.filter(
    (user) => user?.username !== localStorageData?.user?.username
  );

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
                    <div className="suggested-user-name-profile">
                      <img
                        className="user-avatar"
                        src={profileAvatar}
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
