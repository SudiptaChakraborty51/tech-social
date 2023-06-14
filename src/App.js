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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
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
        theme="light"
      />
    </div>
  );
}

export default App;
