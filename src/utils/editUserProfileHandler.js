import axios from "axios";
import { toast } from "react-toastify";

export const editUserProfileHandler = async (
  userData,
  encodedToken,
  dataDispatch
) => {
  try {
    const { data, status } = await axios.post(
      `/api/users/edit`,
      { userData },
      {
        headers: { authorization: encodedToken },
      }
    );
    if (status === 201 || status === 200) {
      dataDispatch({ type: "EDIT_USER", payload: data?.user });
    }
  } catch (e) {
    console.error(e);
    toast.error("Something went wrong, try again!");
  }
};
