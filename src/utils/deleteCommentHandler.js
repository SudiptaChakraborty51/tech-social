import axios from "axios";
import { toast } from "react-toastify";

export const deleteCommentHandler = async (
  encodedToken,
  postId,
  commentId,
  dataDispatch
) => {
  try {
    const { data, status } = await axios.post(
      `/api/comments/delete/${postId}/${commentId}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    if (status === 201 || status === 200) {
      dataDispatch({ type: "SET_ALL_POSTS", payload: data?.posts });
      toast.success("Comment is removed!");
    }
  } catch (e) {
    toast.error(e.response.data.errors[0]);
  }
};
