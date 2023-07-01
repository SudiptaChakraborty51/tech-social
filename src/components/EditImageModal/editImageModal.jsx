import React, { useContext } from "react";
import "./editImageModal.css";
import { avatarDb } from "../Assets/avatarDb";
// import { toast } from "react-toastify";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { DataContext } from "../../contexts/dataContext";

const EditImageModal = ({ setUpdatedProfileData, setEditImageModal }) => {

  const {darkMode} = useContext(DataContext);

  // const imageSelectHandler = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.onchange = (e) => {
  //     const file = e.target.files[0];
  //     if (Math.round(file.size / 1024000) > 1)
  //       toast.error("File size should not be more than 1Mb");
  //     else {
  //       setUpdatedProfileData((prev) => ({
  //         ...prev,
  //         profileAvatar: URL.createObjectURL(file),
  //       }));
  //       setEditImageModal(false);
  //     }
  //   };
  //   input.click();
  // };

  const editImageModalNode = useOutsideClick(() => setEditImageModal(false));

  return (
    <div className="edit-image-modal-container">
      <div className={`edit-image-modal ${darkMode && "bgDarkmode"}`} ref={editImageModalNode}>
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
          {/* <button onClick={imageSelectHandler}>
            <i className="fa-regular fa-image"></i> Browse Profile Image
          </button> */}
          <button
            onClick={() => {
              setUpdatedProfileData((prev) => ({
                ...prev,
                profileAvatar: "",
              }));
              setEditImageModal(false);
            }}
          >
            <i class="fa-regular fa-trash-can"></i> Remove Profile Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImageModal;
