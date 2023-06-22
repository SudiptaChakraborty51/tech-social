import axios from "axios";
import { toast } from "react-toastify";

export const deletePostHandler = async (encodedToken, postId, dataDispatch) => {
  try {
    const { data, status } = await axios.delete(`/api/posts/${postId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    if (status === 201 || status === 200) {
      dataDispatch({ type: "SET_ALL_POSTS", payload: data?.posts });
      toast.success("Post is deleted successfully!");
    }
  } catch (e) {
    console.error(e);
    toast.error(e?.response?.data?.errors[0]);
  }
};
