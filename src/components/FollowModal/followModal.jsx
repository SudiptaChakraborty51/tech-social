import React from "react";
import "./followModal.css";
import { useNavigate } from "react-router-dom";

const FollowModal = ({ data, showFollowModal, setShowFollowModal }) => {
  const navigate = useNavigate();

  return (
    <div className="follow-modal-container">
      <div className="follow-modal">
        <div className="follow-modal-header">
          <h3>{showFollowModal.type}</h3>
          <i
            className="fa-solid fa-xmark"
            onClick={() =>
              setShowFollowModal((prev) => ({ ...prev, show: false, type: "" }))
            }
          ></i>
        </div>
        {data.length > 0 ? (
          <div className="follow-modal-users-container">
            {data?.map(
              ({ _id, firstName, lastName, username, profileAvatar }) => {
                return (
                  <li key={_id}>
                    <div
                      onClick={() => {
                        navigate(`/profile/${username}`);
                        setShowFollowModal((prev) => ({
                          ...prev,
                          show: false,
                        }));
                      }}
                      className="follow-modal-users"
                    >
                      <img
                        style={{
                          height: "50px",
                          width: "50px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src={
                          profileAvatar ||
                          `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
                        }
                        alt="avatar"
                      />
                      <div>
                        <span>
                          {firstName} {lastName}
                        </span>
                        <small>@{username}</small>
                      </div>
                    </div>
                  </li>
                );
              }
            )}
          </div>
        ) : (
          <div>
            <p>{`No ${showFollowModal.type} !`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowModal;
