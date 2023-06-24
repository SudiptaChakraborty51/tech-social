import React, { useContext, useState } from "react";
import "./postCard.css";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";
import { toast } from "react-toastify";
import { likePostHandler } from "../../utils/likePostHandler";
import { dislikePostHandler } from "../../utils/dislikePostHandler";
import { removeFromBookmarkPostHandler } from "../../utils/removeFromBookmarkHandler";
import { addToBookmarkPostHandler } from "../../utils/bookmarkPostHandler";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../Comment/comment";
import { deletePostHandler } from "../../utils/deletePostHandler";
import PostModal from "../PostModal/postModal";
import Linkify from "react-linkify";
import { contentLink } from "../../utils/contentLink";
import { getPostDate } from "../../utils/getPostData";

const PostCard = ({ post }) => {
  const { _id, content, mediaURL, likes, comments, username, createdAt } = post;

  const { dataState, dataDispatch } = useContext(DataContext);
  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const editClickHandler = () => {
    setShowOptions(false);
    setShowEditModal(true);
  };

  console.log(showEditModal);

  const deleteClickHandler = () => {
    deletePostHandler(authState?.token, _id, dataDispatch);
    if (pathname === `/post/${_id}`) {
      setTimeout(() => {
        navigate("/");
        window.scroll({ top: 0, behavior: "smooth" });
      }, 2000);
    }
    setShowOptions((prev) => !prev);
  };

  const isliked = () =>
    likes?.likedBy?.filter(({ _id }) => _id === authState?.user?._id)
      ?.length !== 0;

  const isBookmarked = () =>
    dataState?.bookmarks?.filter((postId) => postId === _id)?.length !== 0;

  const bookmarkClickHandler = () => {
    if (isBookmarked()) {
      removeFromBookmarkPostHandler(authState?.token, _id, dataDispatch);
      toast.success("Removed from Bookmarks");
    } else {
      addToBookmarkPostHandler(authState?.token, _id, dataDispatch);
      toast.success("Added to Bookmarks");
    }
  };

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(`https://tech-social.vercel.app/post/${_id}`);
    toast.success("Link Copied. Start sharing!");
  };

  const { pathname } = useLocation();

  return (
    <div key={_id} className="postcard-main">
      <div className="postcard-header">
        <div
          className="postcard-header-left"
          onClick={() => navigate(`/profile/${username}`)}
        >
          <img
            src={
              dataState?.users?.find((user) => user.username === username)
                ?.profileAvatar
            }
            alt="avatar"
          />
          <div>
            <h4>{`${
              dataState?.users?.find((user) => user.username === username)
                ?.firstName
            } ${
              dataState?.users?.find((user) => user.username === username)
                ?.lastName
            }`}</h4>
            <small>
              @{username}
              {" - "}
              <span>{getPostDate(createdAt)}</span>
            </small>
          </div>
        </div>
        {username === authState?.user?.username && (
          <div className="edit-delete-icon">
            <i
              class="fa-solid fa-ellipsis"
              onClick={() => setShowOptions(!showOptions)}
            ></i>
            {showOptions && (
              <div className="edit-delete-post-modal">
                <div onClick={editClickHandler}>Edit</div>
                <hr />
                <div onClick={deleteClickHandler}>Delete</div>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className="postcard-content-main"
        onClick={() => {
          navigate(`/post/${_id}`);
        }}
      >
        <Linkify className="content" componentDecorator={contentLink}>
          {content}
        </Linkify>
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
      </div>
      <hr />
      <div className="postcard-buttons">
        <div>
          <i
            className={`${isliked() ? "fa-solid" : "fa-regular"} fa-heart`}
            onClick={() => {
              if (!authState?.token) {
                toast.error("Please login to proceed!");
              } else {
                isliked()
                  ? dislikePostHandler(authState?.token, _id, dataDispatch)
                  : likePostHandler(authState?.token, _id, dataDispatch);
              }
            }}
          ></i>{" "}
          <span>{likes?.likeCount}</span>
        </div>
        <div>
          <i
            className="fa-regular fa-comment"
            onClick={() => {
              pathname === `/post/${_id}`
                ? setShowCommentSection(false)
                : setShowCommentSection(!showCommentSection);
            }}
          ></i>{" "}
          <span>{comments?.length}</span>
        </div>
        <div>
          <i
            className={`${
              isBookmarked() ? "fa-solid" : "fa-regular"
            } fa-bookmark`}
            onClick={() => {
              if (!authState?.token) {
                toast.error("Please login to proceed!");
              } else {
                bookmarkClickHandler();
              }
            }}
          ></i>
        </div>
        <div>
          <i
            class="fa-regular fa-share-from-square"
            onClick={copyLinkHandler}
          ></i>
        </div>
      </div>
      {showCommentSection && <Comment post={post} />}

      {showEditModal && (
        <PostModal post={post} setShowEditModal={setShowEditModal} />
      )}
    </div>
  );
};

export default PostCard;
