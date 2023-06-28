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
  });

  const [editImageModal, setEditImageModal] = useState(false);

  const { authState } = useContext(AuthContext);
  const { dataDispatch } = useContext(DataContext);

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
      <div className="edit-profile-modal" ref={editProfileModalNode}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              className="fa-solid fa-camera"
              onClick={() => setEditImageModal(true)}
            ></i>
          </div>
        </div>
        <div className="edit-profile-details">
          <div className="edit-name">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
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
