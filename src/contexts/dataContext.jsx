import React, {
  createContext,
  useContext,
  useEffect,
  useReducer
} from "react";
import { dataReducer } from "../reducer/dataReducer";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "./authContext";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);

  const [dataState, dataDispatch] = useReducer(dataReducer, {
    users: [],
    usersLoading: false,
    posts: [],
    postsLoading: false,
  });

  const getAllUsers = async () => {
    try {
      dataState.usersLoading = true;
      const { data, status } = await axios.get("/api/users");
      if (status === 200) {
        dataDispatch({ type: "SET_ALL_USERS", payload: data?.users });
        dataState.usersLoading = false;
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const getAllPosts = async () => {
    try {
      dataState.postsLoading = true;
      const { data, status } = await axios.get("/api/posts");
      if (status === 200) {
        dataDispatch({ type: "SET_ALL_POSTS", payload: data?.posts });
        dataState.postsLoading = false;
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  useEffect(() => {
    if (authState.token) {
      getAllUsers();
      getAllPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.token]);

  return (
    <DataContext.Provider value={{ dataState }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
