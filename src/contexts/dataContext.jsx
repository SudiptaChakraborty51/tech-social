import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dataReducer } from "../reducer/dataReducer";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "./authContext";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [usersLoading, setUsersLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const { authState } = useContext(AuthContext);

  const [dataState, dataDispatch] = useReducer(dataReducer, {
    users: [],
    posts: [],
  });

  const getAllUsers = async () => {
    try {
      setUsersLoading(true);
      const { data, status } = await axios.get("/api/users");
      if (status === 200) {
        dataDispatch({ type: "SET_ALL_USERS", payload: data?.users });
        setUsersLoading(false);
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const getAllPosts = async () => {
    try {
      setPostsLoading(true);
      const { data, status } = await axios.get("/api/posts");
      if (status === 200) {
        dataDispatch({ type: "SET_ALL_POSTS", payload: data?.posts });
        setPostsLoading(false);
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
  }, [authState.token]);

  return (
    <DataContext.Provider value={{ dataState, usersLoading, postsLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
