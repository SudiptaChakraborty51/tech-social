import axios from "axios";
import { toast } from "react-toastify";

export const editCommentHandler = async (
  encodedToken,
  postId,
  commentId,
  commentData,
  dataDispatch
) => {
  try {
    const { data, status } = await axios.post(
      `/api/comments/edit/${postId}/${commentId}`,
      { commentData },
      { headers: { authorization: encodedToken } }
    );
    if (status === 201 || status === 200) {
      dataDispatch({ type: "SET_ALL_POSTS", payload: data?.posts });
      toast.success("Comment is edited!");
    }
  } catch (e) {
    console.error(e);
    toast.error("Something went wrong, try again!");
  }
};
