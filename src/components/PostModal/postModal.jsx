import React, { useContext, useState } from "react";
import "./postModal.css";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";
import { uploadMedia } from "../../utils/uploadMedia";
import { AuthContext } from "../../contexts/authContext";
import { createPostHandler } from "../../utils/createPostHandler";
import { DataContext } from "../../contexts/dataContext";
import { editPostHandler } from "../../utils/editPostHandler";

const PostModal = ({ post, setShowEditModal, setShowCreatePostModal }) => {
  const [updatedPost, setUpdatedPost] = useState(post || {});
  const [media, setMedia] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { authState } = useContext(AuthContext);
  const { dataDispatch } = useContext(DataContext);

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

  const videoSelectHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      Math.round(file.size / 7168000) > 1
        ? toast.error("File size should not be more than 7Mb")
        : setMedia(file);
    };
    input.click();
  };

  console.log(media);

  const emojiClickHandler = (emojiObj) => {
    const emoji = emojiObj.emoji;
    const updatedContent = updatedPost?.content + emoji;
    setUpdatedPost((prev) => ({ ...prev, content: updatedContent }));
    setShowEmojiPicker(false);
  };

  const isPostDisabled = !updatedPost?.content?.trim() && !media;

  const buttonClickHandler = async () => {
    if (post) {
      try {
        if (media) {
          const response = await uploadMedia(media);
          console.log(response);
          editPostHandler(
            post._id,
            { content: updatedPost?.content, mediaURL: response.url },
            authState?.token,
            dataDispatch
          );
        } else {
          editPostHandler(
            post._id,
            { content: updatedPost?.content, mediaURL: updatedPost?.mediaURL },
            authState?.token,
            dataDispatch
          );
        }
        toast.success("Edited post successfully!");
      } catch (e) {
        toast.error("Something went wrong, try again!");
      } finally {
        setUpdatedPost({});
        setMedia(null);
        setShowEditModal(false);
      }
    } else {
      try {
        const response = await uploadMedia(media);
        console.log(response);
        createPostHandler(
          { content: updatedPost?.content, mediaURL: response.url },
          authState?.token,
          dataDispatch
        );
        toast.success("Added new post successfully!");
      } catch (e) {
        toast.error("Something went wrong, try again!");
      } finally {
        setUpdatedPost({});
        setMedia(null);
        setShowCreatePostModal(false);
      }
    }
  };

  console.log("updatedPost", updatedPost);

  return (
    <div className="edit-post-modal-container">
      <div className="edit-post-modal">
        <div className="edit-post-modal-header">
          {post ? <h1>Edit Post</h1> : <h1>Create Post</h1>}
          <i
            class="fa-solid fa-xmark"
            onClick={() =>
              post ? setShowEditModal(false) : setShowCreatePostModal(false)
            }
          ></i>
        </div>
        <textarea
          value={updatedPost?.content}
          onChange={(e) =>
            setUpdatedPost((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
        ></textarea>
        {updatedPost?.mediaURL || media ? (
          <div className="selected-image-container">
            {updatedPost?.mediaURL?.split("/")[4] === "image" ||
            media?.type?.split("/")[0] === "image" ? (
              <img
                src={media ? URL.createObjectURL(media) : updatedPost?.mediaURL}
                alt="Post-pic"
              />
            ) : updatedPost?.mediaURL?.split("/")[4] === "video" ||
              media?.type?.split("/")[0] === "video" ? (
              <video alt="Post-video">
                <source
                  src={
                    media ? URL.createObjectURL(media) : updatedPost?.mediaURL
                  }
                />
              </video>
            ) : null}
            <button
              onClick={() =>
                updatedPost?.mediaURL
                  ? setUpdatedPost((prev) => ({ ...prev, mediaURL: null }))
                  : setMedia(null)
              }
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="edit-post-modal-buttons">
          <div>
            <i class="fa-regular fa-image" onClick={imageSelectHandler}></i>
            <i
              class="fa-regular fa-file-video"
              onClick={videoSelectHandler}
            ></i>
            <i
              class="fa-regular fa-face-smile"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            ></i>
            {showEmojiPicker && (
              <div className="edit-emoji-picker">
                <Picker onEmojiClick={emojiClickHandler} />
              </div>
            )}
          </div>
          <button
            onClick={buttonClickHandler}
            disabled={isPostDisabled}
            className={
              isPostDisabled ? "modal-button disabled" : "modal-button"
            }
          >
            {post ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
