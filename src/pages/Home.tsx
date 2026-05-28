import React from "react";
import "../assets/css/home.style.css";
import Greeting from "../components/home-comp/Greeting";
import Recommend from "../components/home-comp/Recommend";

const Home = () => {
  return (
    <div className="home-container">
      <Greeting />
      <Recommend />
    </div>
  );
};

export default Home;
