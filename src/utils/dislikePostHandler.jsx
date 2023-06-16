import axios from "axios";

export const dislikePostHandler = async (encodedToken, postId, dataDispatch) => {
  try {
    const { data, status } = await axios.post(
      `/api/posts/dislike/${postId}`,
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
  }
};
