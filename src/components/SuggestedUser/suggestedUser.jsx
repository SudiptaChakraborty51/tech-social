import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";
import "./suggestedUser.css";

const SuggestedUser = () => {
  const { dataState, usersLoading } = useContext(DataContext);
  const { localStorageData } = useContext(AuthContext);
  console.log(dataState?.users);
  console.log(localStorageData);
  const suggestedUser = dataState?.users?.filter(
    (user) => user?.username !== localStorageData?.user?.username
  );

  console.log(suggestedUser);

  return (
    <div>
      {usersLoading ? (
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