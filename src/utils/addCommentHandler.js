import axios from "axios";
import { toast } from "react-toastify";

export const addCommentHandler = async (
  encodedToken,
  postId,
  commentData,
  dataDispatch
) => {
  try {
    const { data, status } = await axios.post(
      `/api/comments/add/${postId}`,
      { commentData },
      { headers: { authorization: encodedToken } }
    );
    if (status === 201 || status === 200) {
      dataDispatch({ type: "SET_ALL_POSTS", payload: data?.posts });
      toast.success("Comment is added!");
    }
  } catch (e) {
    toast.error(e.response.data.errors[0]);
  }
};
