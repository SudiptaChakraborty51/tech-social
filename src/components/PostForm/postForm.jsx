import React, { useContext, useState } from "react";
import "./postForm.css";
import { AuthContext } from "../../contexts/authContext";
import { DataContext } from "../../contexts/dataContext";
import { useNavigate } from "react-router-dom";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";
import { uploadMedia } from "../../utils/uploadMedia";
import { createPostHandler } from "../../utils/createPostHandler";

const PostForm = () => {
  const { authState } = useContext(AuthContext);
  const { dataState, dataDispatch } = useContext(DataContext);

  const navigate = useNavigate();

  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const imageSelectHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      Math.round(file.size / 1024000) > 1
        ? toast.error("File size should not be more than 1Mb")
        : setMedia(file);
    };
    input.click();
  };

  // const videoSelectHandler = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "video/*";
  //   input.onchange = (e) => {
  //     const file = e.target.files[0];
  //     Math.round(file.size / 7168000) > 1
  //       ? toast.error("File size should not be more than 7Mb")
  //       : setMedia(file);
  //   };
  //   input.click();
  // };

  const emojiClickHandler = (emojiObj) => {
    const emoji = emojiObj.emoji;
    const updatedContent = postContent + emoji;
    setPostContent(updatedContent);
    setShowEmojiPicker(false);
  };

  const isPostDisabled = postContent.trim() === "" && !media;

  const postClickHandler = async () => {
    // toast.warn("Creating a new Post...");
    try {
      const response = await uploadMedia(media);
      createPostHandler(
        { content: postContent, mediaURL: response.url },
        authState?.token,
        dataDispatch
      );
      toast.success("Added new post successfully!");
    } catch (e) {
      toast.error("Something went wrong, try again!");
    } finally {
      setPostContent("");
      setMedia(null);
    }
  };

  return (
    <div className="post-form">
      <div className="post-form-container">
        <img
          className="create-post-avatar"
          onClick={() => {
            navigate(`/profile/${authState?.user?.username}`);
          }}
          src={
            dataState?.users?.find((user) => user._id === authState?.user?._id)
              ?.profileAvatar ||
            `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
          }
          alt="profile-pic"
        />
        <textarea
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
      </div>
      {media && (
        <div className="selected-image-container">
          {media.type.slice(0, 5) === "image" ? (
            <img src={URL.createObjectURL(media)} alt="Post-pic" />
          ) : media.type.slice(0, 5) === "video" ? (
            <video alt="Post-video">
              <source src={URL.createObjectURL(media)} />
            </video>
          ) : null}
          <button onClick={() => setMedia(null)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
      <div className="post-form-button-container" >
        <div>
          <i className="fa-regular fa-image" onClick={imageSelectHandler}></i>
          {/* <i className="fa-regular fa-file-video" onClick={videoSelectHandler}></i> */}
          <i
            className="fa-regular fa-face-smile"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          ></i>
          {showEmojiPicker && (
            <div className="show-emoji-picker">
              <Picker onEmojiClick={emojiClickHandler} />
            </div>
          )}
        </div>
        <button
          onClick={postClickHandler}
          disabled={isPostDisabled}
          className={isPostDisabled ? "post-button disabled" : "post-button"}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostForm;
