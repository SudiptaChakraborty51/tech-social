import axios from "axios";
import { toast } from "react-toastify";

export const unfollowUserHandler = async (
  encodedToken,
  followUserId,
  dataDispatch
) => {
  try {
    const { data, status } = await axios.post(
      `/api/users/unfollow/${followUserId}`,
      {},
      {
        headers: { authorization: encodedToken },
      }
    );
    if (status === 200 || status === 201) {
      dataDispatch({ type: "UPDATE_USER", payload: data?.followUser });
      dataDispatch({ type: "UPDATE_USER", payload: data?.user });
      toast.success(`Unfollowed @${data?.followUser?.username}`);
    }
  } catch (e) {
    console.error(e);
    toast.error(e?.response?.data?.errors[0]);
  }
};
