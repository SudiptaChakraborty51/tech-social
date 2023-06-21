import React, { useContext, useState } from "react";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";

const CommentItem = ({ comment }) => {
  console.log(comment);
  const { dataState } = useContext(DataContext);
  const { authState } = useState(AuthContext);

  const commentUser = dataState?.users?.find(
    ({ username }) => username === comment.username
  );
  const isLoggedInUserComment = comment.username === authState?.user?.username;
  return (
    <div key={comment._id} style={{ norder: "1px solid black" }}>
      {isLoggedInUserComment ? (
        <img
          style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }}
          src={
            authState?.user?.profileAvatar ||
            `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
          }
          alt="profile-pic"
        />
      ) : (
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={
            commentUser?.profileAvatar ||
            `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
          }
          alt="profile-pic"
        />
      )}
      <div>
        {isLoggedInUserComment ? (
          <span>
            {authState?.user?.firstName} {authState?.user?.lastName}
          </span>
        ) : (
          <span>
            {commentUser?.firstName} {commentUser?.lastName}
          </span>
        )}
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
