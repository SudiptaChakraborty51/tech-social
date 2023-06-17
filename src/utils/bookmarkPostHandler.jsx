import axios from "axios";

export const addToBookmarkPostHandler = async (
  encodedToken,
  postId,
  dataDispatch
) => {
  console.log(postId);
  try {
    const { data, status } = await axios.post(
      `/api/users/bookmark/${postId}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    if (status === 200) {
      dataDispatch({
        type: "SET_ALL_BOOKMARKS",
        payload: data?.bookmarks,
      });
    }
  } catch (e) {
    console.error(e);
  }
};
