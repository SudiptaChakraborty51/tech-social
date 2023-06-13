import React from 'react';
import "./home.css";
import Navbar from '../../components/Navbar/navbar';
import LeftSideBar from '../../components/LeftSideBar/leftSideBar';

const Home = () => {
    document.title = "tech-social | Home";
  return (
    <div className='home'>
      <Navbar />
      <div className='home-content'>
        <LeftSideBar />
      </div>
    </div>
  )
}

export default Home
