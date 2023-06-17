import React, { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/authContext";
import { toast } from "react-toastify";

const Login = () => {
  document.title = "tech-social | Login";
  const navigate = useNavigate();

  const { userLogin } = useContext(AuthContext);

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
    console.log(userData);
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
    <div className="login">
      <div className="login-logo">
        <img src={logo} alt="logo" />
        <h2>tech-social</h2>
      </div>
      <p>Social media for programmers</p>
      <h2>Login</h2>
      <form>
        <div className="login-form-div">
          <label for="username">
            Username <span>*</span>
          </label>
          <input
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
                <i class="fa-regular fa-eye-slash"></i>
              ) : (
                <i class="fa-regular fa-eye"></i>
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
        Create New account <i class="fa-solid fa-angle-right"></i>
      </p>
    </div>
  );
};

export default Login;
