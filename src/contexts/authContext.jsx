import React, { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducer/authReducer";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageData = JSON.parse(localStorage.getItem("data"));

  const initialAuth = {
    user: {},
    token: localStorageData?.token || "",
  };

  const [authState, authDispatch] = useReducer(authReducer, initialAuth);

  const userLogin = async (loginData) => {
    try {
      const { status, data } = await axios.post(`/api/auth/login`, loginData);
      if (status === 200) {
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.foundUser, token: data?.encodedToken })
        );
        authDispatch({ type: "SET_USER", payload: data?.foundUser });
        authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });
        toast.success("Login Successful!");
        navigate(location?.state?.from?.pathname || "/");
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response.data.errors[0]);
    }
  };

  const userSignup = async (signupData) => {
    try {
      const { status, data } = await axios.post(`/api/auth/signup`, signupData);
      if (status === 201) {
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.createdUser, token: data?.encodedToken })
        );
        authDispatch({ type: "SET_USER", payload: data?.createdUser });
        authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });
        toast.success("Signup Successful!");
        navigate(location?.state?.from?.pathname || "/");
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response.data.errors[0]);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("data");
    authDispatch({ type: "SET_USER", payload: {} });
    authDispatch({ type: "SET_TOKEN", payload: "" });
    toast.success("You're logged out!");
  };

  useEffect(() => {
    if (localStorageData) {
      authDispatch({ type: "SET_USER", payload: localStorageData?.user });
      authDispatch({ type: "SET_TOKEN", payload: localStorageData?.token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, userLogin, userSignup, userLogout, localStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
