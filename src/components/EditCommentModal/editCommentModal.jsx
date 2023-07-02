import React, { useContext, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { DataContext } from "../../contexts/dataContext";
import { editCommentHandler } from "../../utils/editCommentHandler";
import Picker from "emoji-picker-react";
import "./editCommentModal.css";
import { AuthContext } from "../../contexts/authContext";

const EditCommentModal = ({ comment, setShowEditCommentModal, postId }) => {
  const { darkMode, dataDispatch } = useContext(DataContext);
  const { authState } = useContext(AuthContext);

  const [updatedComment, setUpdatedComment] = useState({
    _id: comment?._id,
    text: comment?.text,
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const editCommentModalNode = useOutsideClick(() =>
    setShowEditCommentModal(false)
  );
  const showEmojiPickerNode = useOutsideClick(() => setShowEmojiPicker(false));

  const emojiClickHandler = (emojiObj) => {
    const emoji = emojiObj.emoji;
    const updatedCommentText = updatedComment?.text
      ? updatedComment?.text + emoji
      : emoji;
    setUpdatedComment((prev) => ({ ...prev, text: updatedCommentText }));
    setShowEmojiPicker(false);
  };

  const buttonClickHandler = () => {
    editCommentHandler(
      authState?.token,
      postId,
      updatedComment?._id,
      updatedComment?.text,
      dataDispatch
    );
    setShowEditCommentModal(false);
  };

  return (
    <div className="edit-comment-modal-container">
      <div
        className={`edit-comment-modal ${darkMode && "bgDarkmode"}`}
        ref={editCommentModalNode}
      >
        <div className="edit-comment-header">
          <h2>Edit Comment</h2>
          <i
            className="fa-solid fa-xmark"
            onClick={() => setShowEditCommentModal(false)}
          ></i>
        </div>
        <textarea
          className={`${darkMode && "bgDarkmode"}`}
          value={updatedComment?.text}
          onChange={(e) =>
            setUpdatedComment((prev) => ({
              ...prev,
              text: e.target.value,
            }))
          }
        ></textarea>
        <div className="edit-comment-modal-buttons">
          <div className="edit-comment-modal-icons">
            <div ref={showEmojiPickerNode}>
              <i
                className="fa-regular fa-face-smile"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              ></i>
              {showEmojiPicker && (
                <div
                  className="edit-emoji-picker"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Picker
                    onEmojiClick={emojiClickHandler}
                    width={300}
                    height={450}
                    theme={darkMode ? "dark" : "light"}
                  />
                </div>
              )}
            </div>
          </div>
          <button onClick={buttonClickHandler} className="modal-button">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCommentModal;
