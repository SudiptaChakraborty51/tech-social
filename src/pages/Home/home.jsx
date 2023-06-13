import React from 'react';
import "./home.css";
import Navbar from '../../components/Navbar/navbar';

const Home = () => {
    document.title = "tech-social | Home";
  return (
    <div className='home'>
      <Navbar />
    </div>
  )
}

export default Home
