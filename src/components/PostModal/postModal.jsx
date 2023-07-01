import React, { useContext, useState } from "react";
import "./postModal.css";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";
import { uploadMedia } from "../../utils/uploadMedia";
import { AuthContext } from "../../contexts/authContext";
import { createPostHandler } from "../../utils/createPostHandler";
import { DataContext } from "../../contexts/dataContext";
import { editPostHandler } from "../../utils/editPostHandler";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const PostModal = ({ post, setShowEditModal, setShowCreatePostModal }) => {
  const [updatedPost, setUpdatedPost] = useState(post || {});
  const [media, setMedia] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { authState } = useContext(AuthContext);
  const { dataDispatch, darkMode } = useContext(DataContext);

  const domNode = useOutsideClick(() => setShowEmojiPicker(false));

  const postModalNode = useOutsideClick(() =>
    post ? setShowEditModal(false) : setShowCreatePostModal(false)
  );

  // const imageSelectHandler = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.onchange = (e) => {
  //     const file = e.target.files[0];
  //     Math.round(file.size / 1024000) > 1
  //       ? toast.error("File size should not be more than 1Mb")
  //       : setMedia(file);
  //   };
  //   input.click();
  // };

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
    const updatedContent = updatedPost?.content
      ? updatedPost?.content + emoji
      : emoji;
    setUpdatedPost((prev) => ({ ...prev, content: updatedContent }));
    setShowEmojiPicker(false);
  };

  const isPostDisabled = !updatedPost?.content?.trim() && !media;

  const buttonClickHandler = async () => {
    if (post) {
      try {
        if (media) {
          const response = await uploadMedia(media);
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

  return (
    <div className="edit-post-modal-container">
      <div className={`edit-post-modal ${darkMode && "bgDarkmode"}`} ref={postModalNode}>
        <div className="edit-post-modal-header">
          {post ? <h1>Edit Post</h1> : <h1>Create Post</h1>}
          <i
            className="fa-solid fa-xmark"
            onClick={() =>
              post ? setShowEditModal(false) : setShowCreatePostModal(false)
            }
          ></i>
        </div>
        <textarea
          className={`${darkMode && "bgDarkmode"}`}
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
                {media ? (
                  <source src={URL.createObjectURL(media)} />
                ) : (
                  <source src={updatedPost?.mediaURL} />
                )}
              </video>
            ) : null}
            <button
              onClick={() =>
                updatedPost?.mediaURL
                  ? setUpdatedPost((prev) => ({ ...prev, mediaURL: null }))
                  : setMedia(null)
              }
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="edit-post-modal-buttons">
          <div className="edit-post-modal-icons">
            {/* <div>
              <i
                className="fa-regular fa-image"
                onClick={imageSelectHandler}
              ></i>
            </div>
            <div>
              <i
                className="fa-regular fa-file-video"
                onClick={videoSelectHandler}
              ></i>
            </div> */}
            <div ref={domNode}>
              <i
                className="fa-regular fa-face-smile"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              ></i>
              {showEmojiPicker && (
                <div
                  className="edit-emoji-picker"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Picker onEmojiClick={emojiClickHandler}  width={300} height={450}/>
                </div>
              )}
            </div>
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
