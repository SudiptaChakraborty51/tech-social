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
  const { authState } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const [dataState, dataDispatch] = useReducer(dataReducer, {
    users: [],
    usersLoading: false,
    posts: [],
    postsLoading: false,
    bookmarks: [],
  });

  const getAllUsers = async () => {
    try {
      dataDispatch({ type: "USERS_LOADING", payload: true });
      const { data, status } = await axios.get("/api/users");
      if (status === 200) {
        dataDispatch({ type: "SET_ALL_USERS", payload: data?.users });
        dataDispatch({ type: "USERS_LOADING", payload: false });
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const getAllPosts = async () => {
    try {
      dataDispatch({ type: "POSTS_LOADING", payload: true });
      const { data, status } = await axios.get("/api/posts");
      if (status === 200) {
        dataDispatch({ type: "SET_ALL_POSTS", payload: data?.posts });
        dataDispatch({ type: "POSTS_LOADING", payload: false });
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const getAllBookmarks = async () => {
    try {
      const { data, status } = await axios.get(`api/users/bookmark`, {
        headers: {
          authorization: authState?.token,
        },
      });
      if (status === 200) {
        dataDispatch({ type: "SET_ALL_BOOKMARKS", payload: data?.bookmarks });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (authState.token) {
      getAllUsers();
      getAllPosts();
      getAllBookmarks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.token]);

  useEffect(() => {
    localStorage.setItem("theme", `${darkMode ? "dark" : "light"}`);
  }, [darkMode]);

  return (
    <DataContext.Provider
      value={{ dataState, dataDispatch, darkMode, setDarkMode }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
