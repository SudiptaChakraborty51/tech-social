import React from "react";
import "./editImageModal.css";
import { avatarDb } from "../Assets/avatarDb";

const EditImageModal = ({
  setUpdatedProfileData,
  editImageModal,
  setEditImageModal,
}) => {
  return (
    <div className="edit-image-modal-container">
      <div className="edit-image-modal">
        <div className="edit-image-modal-header">
          <h3>Edit Profile Image</h3>
          <i
            className="fa-solid fa-xmark"
            onClick={() => setEditImageModal(false)}
          ></i>
        </div>
        <div className="avatar-container">
          {avatarDb?.map((avatar) => (
            <img
              src={avatar}
              key={avatar}
              alt="avatar"
              name="profileAvatar"
              value={avatar}
              onClick={() => {
                setUpdatedProfileData((prev) => ({
                  ...prev,
                  profileAvatar: avatar,
                }));
                setEditImageModal(false);
              }}
            />
          ))}
        </div>
        <div className="edit-image-buttons">
          <button>
            <i className="fa-regular fa-image"></i> Browse Profile Image
          </button>
          <button>
            <i class="fa-regular fa-trash-can"></i> Remove Profile Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImageModal;
