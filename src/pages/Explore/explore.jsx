import React from "react";
import "./explore.css";
import Navbar from "../../components/Navbar/navbar";

const Explore = () => {
  document.title = "tech-social | Explore";
  return (
    <div className="explore">
      <Navbar />
    </div>
  );
};

export default Explore;
