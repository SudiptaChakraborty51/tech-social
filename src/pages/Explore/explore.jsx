import React, { useContext } from "react";
import "./explore.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { AuthContext } from "../../contexts/authContext";

const Explore = () => {
  document.title = "tech-social | Explore";
  const { authState } = useContext(AuthContext);
  return (
    <div className="explore">
      <Navbar />
      <div className="explore-content">
        <LeftSideBar />
        <div className="explore-main">Explore</div>
        {authState?.token && <RightSideBar />}
      </div>
    </div>
  );
};

export default Explore;
