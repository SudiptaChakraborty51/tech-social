import React, { useContext, useState } from "react";
import "./editProfileModal.css";
import { editUserProfileHandler } from "../../utils/editUserProfileHandler";
import { AuthContext } from "../../contexts/authContext";
import { DataContext } from "../../contexts/dataContext";
import { toast } from "react-toastify";
import EditImageModal from "../EditImageModal/editImageModal";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const EditProfileModal = ({ profileData, setEditProfileModal }) => {
  const [updatedProfileData, setUpdatedProfileData] = useState({
    firstName: profileData?.firstName,
    lastName: profileData?.lastName,
    bio: profileData?.bio,
    website: profileData?.website,
    profileAvatar: profileData?.profileAvatar,
    backgroundImage: profileData?.backgroundImage,
  });

  const [editImageModal, setEditImageModal] = useState(false);

  const { authState } = useContext(AuthContext);
  const { dataDispatch, darkMode } = useContext(DataContext);

  const imageSelectHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (Math.round(file.size / 1024000) > 1)
        toast.error("File size should not be more than 1Mb");
      else {
        setUpdatedProfileData((prev) => ({
          ...prev,
          backgroundImage: URL.createObjectURL(file),
        }));
      }
    };
    input.click();
  };

  const updateProfileDetails = (e) => {
    const { name, value } = e.target;
    setUpdatedProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfileHandler = () => {
    editUserProfileHandler(updatedProfileData, authState?.token, dataDispatch);
    setEditProfileModal((editProfileModal) => !editProfileModal);
    toast.success("Profile updated successfully!");
  };

  const editProfileModalNode = useOutsideClick(() =>
    setEditProfileModal(false)
  );

  return (
    <div className="edit-profile-modal-container">
      <div
        className={`edit-profile-modal ${darkMode && "bgDarkmode"}`}
        ref={editProfileModalNode}
      >
        {editImageModal && (
          <EditImageModal
            setUpdatedProfileData={setUpdatedProfileData}
            setEditImageModal={setEditImageModal}
          />
        )}
        <div className="edit-profile-header">
          <h2>Edit Profile</h2>
          <i
            className="fa-solid fa-xmark"
            onClick={() => setEditProfileModal(false)}
          ></i>
        </div>
        <div className="edit-image-bgImage-container">
          <div className="edit-bgImage-container">
            <img
              className="background-image"
              src={
                updatedProfileData?.backgroundImage ||
                `https://res.cloudinary.com/dqlasoiaw/image/upload/v1688279047/tech-social/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-matrix-background-with-digits-1-0-illustration-vector_vzvd5n.jpg`
              }
              alt="background-pic"
            />
            <i
              className={`fa-solid fa-camera ${darkMode && "bgDarkmode"}`}
              onClick={imageSelectHandler}
            ></i>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "70px",
              left: "0px",
              right: "0px",
            }}
          >
            <div className="profile-image-edit">
              <img
                className="avatar"
                src={
                  updatedProfileData?.profileAvatar ||
                  `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
                }
                alt="avatar"
              />
              <i
                className={`fa-solid fa-camera ${darkMode && "bgDarkmode"}`}
                onClick={() => setEditImageModal(true)}
              ></i>
            </div>
          </div>
        </div>
        <div className="edit-profile-details">
          <div className="edit-name">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                className={`${darkMode && "bgDarkmode"}`}
                id="firstName"
                type="text"
                name="firstName"
                value={updatedProfileData?.firstName}
                onChange={updateProfileDetails}
              />
            </div>
            <div>
              <label htmlFor="lastName">last Name</label>
              <input
                className={`${darkMode && "bgDarkmode"}`}
                id="lastName"
                type="text"
                name="lastName"
                value={updatedProfileData?.lastName}
                onChange={updateProfileDetails}
              />
            </div>
          </div>
          <div className="edit-website">
            <label htmlFor="website">Website</label>
            <input
              className={`${darkMode && "bgDarkmode"}`}
              id="website"
              type="text"
              name="website"
              value={updatedProfileData?.website}
              onChange={updateProfileDetails}
            />
          </div>
          <div className="edit-bio">
            <label htmlFor="bio">Bio</label>
            <textarea
              className={`${darkMode && "bgDarkmode"}`}
              id="bio"
              placeholder="bio"
              name="bio"
              value={updatedProfileData?.bio}
              onChange={updateProfileDetails}
            />
          </div>
        </div>
        <button onClick={updateProfileHandler}>Update</button>
      </div>
    </div>
  );
};

export default EditProfileModal;
