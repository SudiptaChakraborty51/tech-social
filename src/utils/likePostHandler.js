import axios from "axios";
import { toast } from "react-toastify";

export const likePostHandler = async (encodedToken, postId, dataDispatch) => {
  try {
    const { data, status } = await axios.post(
      `/api/posts/like/${postId}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    if (status === 201) {
      dataDispatch({ type: "SET_ALL_POSTS", payload: data?.posts });
    }
  } catch (e) {
    console.error(e);
    toast.error(e?.response?.data?.errors[0]);
  }
};
