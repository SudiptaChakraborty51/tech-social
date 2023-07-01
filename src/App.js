import "./App.css";
import Mockman from "mockman-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/landing";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Home from "./pages/Home/home";
import RequireAuth from "./components/Auth/requireAuth";
import Explore from "./pages/Explore/explore";
import Bookmarks from "./pages/Bookmarks/bookmarks";
import LikedPosts from "./pages/LikedPosts/likedPosts";
import PostDetails from "./pages/PostDetails/postDetails";
import Profile from "./pages/Profile/profile";
import { useContext } from "react";
import { DataContext } from "./contexts/dataContext";

function App() {

  const {darkMode} = useContext(DataContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/register" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postID" element={<PostDetails />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="liked-posts" element={<LikedPosts />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Route>
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;
