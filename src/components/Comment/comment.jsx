import React, { useContext, useState } from "react";
import CommentItem from "../CommentItem/commentItem";
import { AuthContext } from "../../contexts/authContext";

const Comment = ({ post }) => {
  console.log(post);
  const { authState } = useContext(AuthContext);

  const [commentText, setCommentText] = useState("");

  return (
    <div>
      <img
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
        src={
          authState?.user?.profileAvatar ||
          `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
        }
        alt="profile-pic"
      />
      <div>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <i class="fa-solid fa-paper-plane"></i>
      </div>
      {post?.comments?.length > 0 ? (
        post?.comments?.map((comment) => (
          <CommentItem comment={comment} key={comment._id} />
        ))
      ) : (
        <p>Share your comment!</p>
      )}
    </div>
  );
};

export default Comment;
