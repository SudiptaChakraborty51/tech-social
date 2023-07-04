import React, { useContext, useEffect, useState } from "react";
import "./postDetails.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/PostCard/postCard";
import { DataContext } from "../../contexts/dataContext";
import ClipLoader from "react-spinners/ClipLoader";
import { addCommentHandler } from "../../utils/addCommentHandler";
import { deleteCommentHandler } from "../../utils/deleteCommentHandler";
import { AuthContext } from "../../contexts/authContext";
import EditCommentModal from "../../components/EditCommentModal/editCommentModal";

const PostDetails = () => {
  document.title = "tech-social | Post Details";

  const [singlePostLoading, setSinglePostLoading] = useState(true);
  const [postDetails, setPostDetails] = useState({});
  const [commentText, setCommentText] = useState("");
  const [showEditCommentModal, setShowEditCommentModal] = useState({
    show: false,
    commentId: "",
  });

  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);

  const { dataState, darkMode, dataDispatch } = useContext(DataContext);

  const { postID } = useParams();

  const commentDetails =
    showEditCommentModal.show &&
    postDetails?.comments?.find(
      (comment) => comment._id === showEditCommentModal.commentId
    );

  const getPostDetails = async () => {
    try {
      const { data, status } = await axios.get(`/api/posts/${postID}`);
      if (status === 200) {
        setPostDetails(data?.post);
        setSinglePostLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isCommentDisabled = commentText.trim() === "";

  useEffect(() => {
    getPostDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataState.posts]);

  return (
    <div className={`post-details ${darkMode && "bgDarkmode"}`}>
      <Navbar />
      <div className="post-details-content">
        <LeftSideBar />
        <div className="post-details-main">
          {singlePostLoading ? (
            <ClipLoader color="var(--primary-dark)" size={60} />
          ) : (
            postDetails && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PostCard key={postDetails._id} post={postDetails} />
                <div className="comment-main-container">
                  <img
                    src={
                      authState?.user?.profileAvatar ||
                      `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
                    }
                    alt="profile-pic"
                  />
                  <div className="comment-input-container">
                    <input
                      className={`${darkMode && "bgDarkmode"}`}
                      type="text"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <i
                      className="fa-solid fa-paper-plane"
                      style={{
                        cursor: isCommentDisabled && "not-allowed",
                      }}
                      onClick={() => {
                        !isCommentDisabled &&
                          addCommentHandler(
                            authState?.token,
                            postID,
                            commentText,
                            dataDispatch
                          );
                        setCommentText("");
                      }}
                    ></i>
                  </div>
                </div>
                {postDetails?.comments?.length > 0 ? (
                  <div
                    className={`single-page-comment-container ${
                      darkMode && "bgSecondaryDarkMode"
                    }`}
                  >
                    {postDetails?.comments?.map((comment) => {
                      const userComment = dataState?.users?.find(
                        (user) => user.username === comment?.username
                      );
                      return (
                        <div
                          key={comment._id}
                          className="post-comment-container"
                        >
                          <img
                            src={
                              userComment?.profileAvatar ||
                              `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
                            }
                            alt="profile-pic"
                            onClick={() =>
                              navigate(`/profile/${userComment?.username}`)
                            }
                          />
                          <div
                            className={`post-comment-content ${
                              darkMode && "bgDarkmode"
                            }`}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <strong>{`${userComment?.firstName} ${userComment?.lastName}`}</strong>
                              {userComment?.username ===
                                authState?.user?.username && (
                                <div className="comment-edit-delete-icon">
                                  <i
                                    class="fa-solid fa-pen"
                                    onClick={() =>
                                      setShowEditCommentModal({
                                        show: true,
                                        commentId: comment._id,
                                      })
                                    }
                                  ></i>
                                  <i
                                    class="fa-solid fa-trash-can"
                                    onClick={() =>
                                      deleteCommentHandler(
                                        authState?.token,
                                        postID,
                                        comment?._id,
                                        dataDispatch
                                      )
                                    }
                                  ></i>
                                </div>
                              )}
                            </div>
                            <p className="comment-text">{comment?.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No comments, Share your comment!</p>
                )}
              </div>
            )
          )}
        </div>
        <div className="rightSideBar">
          <RightSideBar />
        </div>
      </div>
      {showEditCommentModal.show && (
        <EditCommentModal
          comment={commentDetails}
          setShowEditCommentModal={setShowEditCommentModal}
          postId={postDetails?._id}
        />
      )}
    </div>
  );
};

export default PostDetails;
