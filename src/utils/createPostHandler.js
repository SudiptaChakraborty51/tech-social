import axios from "axios";
import { toast } from "react-toastify";

export const createPostHandler = async (
  { content, mediaURL, comments },
  encodedToken,
  dataDispatch
) => {
  try {
    const { data, status } = await axios.post(
      `/api/posts`,
      { postData: { content, mediaURL, comments } },
      {
        headers: { authorization: encodedToken },
      }
    );
    if (status === 201) {
      dataDispatch({ type: "CREATE_NEW_POST", payload: data?.posts });
    }
  } catch (e) {
    console.error(e);
    toast.error("Something went wrong, try again!");
  }
};
