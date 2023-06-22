import React, { useContext, useState } from "react";
import "./postForm.css";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Picker from "emoji-picker-react";

const PostForm = () => {
  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();

  const [postContent, setPostContent] = useState("");
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const imageSelectHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageName(imageUrl);
    };
    input.click();
  };

  console.log(selectedImageName);

  const emojiClickHandler = (emojiObj) => {
    const emoji = emojiObj.emoji;
    const updatedContent = postContent + emoji;
    setPostContent(updatedContent);
    setShowEmojiPicker(false);
  };

  const isPostDisabled = postContent.trim() === "";

  const postClickHandler = () => {
    setPostContent("");
    setSelectedImageName(null);
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
            authState?.user?.profileAvatar ||
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
      {selectedImageName && (
        <div className="selected-image-container">
          <img src={selectedImageName} alt="Post" />
          <button onClick={() => setSelectedImageName(null)}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
      <div className="post-form-button-container">
        <div>
          <i class="fa-regular fa-image" onClick={imageSelectHandler}></i>
          <i
            class="fa-regular fa-face-smile"
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
