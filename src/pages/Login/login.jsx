import React, { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/authContext";
import { toast } from "react-toastify";
import { DataContext } from "../../contexts/dataContext";

const Login = () => {
  document.title = "tech-social | Login";
  const navigate = useNavigate();

  const { userLogin } = useContext(AuthContext);

  const { darkMode } = useContext(DataContext);

  const [isPasswordHide, setIsPasswordHide] = useState(true);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const guestUserData = {
    username: "schakraborty",
    password: "sudipta@26",
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!userData.username.trim() || !userData.password.trim()) {
      toast.error("Enter valid input!");
    } else {
      userLogin(userData);
    }
  };

  const loginAsGuestHandler = (e) => {
    e.preventDefault();
    setUserData(guestUserData);
    userLogin(guestUserData);
  };

  return (
    <div className={`login-container ${darkMode && "bgDarkmode"}`}>
      <div className={`login ${darkMode && "bgSecondaryDarkMode"}`}>
        <div className="login-logo">
          <img src={logo} alt="logo" />
          <h2>tech-social</h2>
        </div>
        <p className="tagline">Social media for programmers</p>
        <h2>Login</h2>
        <form>
          <div className="login-form-div">
            <label for="username">
              Username <span>*</span>
            </label>
            <input
              className={`${darkMode && "bgDarkmode"}`}
              id="username"
              type="text"
              placeholder="testadmin"
              required
              value={userData.username}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div className="login-form-div">
            <label for="password">
              Password <span>*</span>
            </label>
            <div className="password-wrapper">
              <input
                className={`${darkMode && "bgDarkmode"}`}
                minlength="4"
                maxlength="10"
                id="password"
                type={isPasswordHide ? "password" : "text"}
                placeholder={isPasswordHide ? "********" : "Enter password"}
                required
                value={userData.password}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <span
                onClick={() =>
                  setIsPasswordHide((isPasswordHide) => !isPasswordHide)
                }
              >
                {isPasswordHide ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          <button type="submit" className="login-button" onClick={loginHandler}>
            Login
          </button>
          <button
            type="submit"
            className="login-button guest"
            onClick={loginAsGuestHandler}
          >
            Login As Guest
          </button>
        </form>

        <p
          onClick={() => navigate("/signup")}
          className="create-new-account-link"
        >
          Create New account <i className="fa-solid fa-angle-right"></i>
        </p>
      </div>
    </div>
  );
};

export default Login;
