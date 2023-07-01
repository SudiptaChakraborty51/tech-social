import axios from "axios";
import { toast } from "react-toastify";

export const editPostHandler = async (
  postId,
  { content, mediaURL },
  encodedToken,
  dataDispatch
) => {
  try {
    const { data, status } = await axios.post(
      `/api/posts/edit/${postId}`,
      { postData: { content, mediaURL } },
      {
        headers: { authorization: encodedToken },
      }
    );
    if (status === 201) {
      dataDispatch({ type: "EDIT_POST", payload: data?.posts });
    }
  } catch (e) {
    console.error(e);
    toast.error("Something went wrong, try again!");
  }
};
