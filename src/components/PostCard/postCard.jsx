import React, { useContext, useEffect, useState } from "react";
import "./postCard.css";
import { DataContext } from "../../contexts/dataContext";

const PostCard = ({ post }) => {
  const {
    _id,
    content,
    contentLink,
    mediaURL,
    likes,
    comments,
    username,
    createdAt,
  } = post;

  const [userDetails, setUserDetails] = useState({});

  const { dataState } = useContext(DataContext);

  useEffect(() => {
    setUserDetails(
      dataState?.users?.find((user) => user.username === username)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key={_id} className="postcard-main">
      <div className="postcard-header">
        <div className="postcard-header-left">
          <img src={userDetails?.profileAvatar} alt="avatar" />
          <div>
            <h4>{`${userDetails?.firstName} ${userDetails?.lastName}`}</h4>
            <small>@{username}{" - "}<span>{` ${new Date(createdAt)
              .toDateString()
              .split(" ")
              .slice(1, 4)
              .join(" ")}`}</span></small>
          </div>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <p>{content}</p>
      {contentLink && (
        <a href={`${contentLink}`} target="_blank" rel="noopener noreferrer">
          {contentLink}
        </a>
      )}
      {mediaURL && mediaURL.split("/")[4] === "image" ? (
        <img
          src={mediaURL}
          alt="post-pic"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
      ) : (
        mediaURL && (
          <video
            controls
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          >
            <source src={mediaURL} />
          </video>
        )
      )}
      <hr />
      <div className="postcard-buttons">
        <div>
          <i className="fa-regular fa-heart"></i> <span>{likes.likeCount}</span>
        </div>
        <div>
          <i className="fa-regular fa-comment"></i>{" "}
          <span>{comments.length}</span>
        </div>
        <div>
          <i className="fa-regular fa-bookmark"></i>
        </div>
        <div>
          <i class="fa-regular fa-share-from-square"></i>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
