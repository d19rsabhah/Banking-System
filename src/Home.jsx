import React from "react";
import icon from "./Banks.png";
const Home = () => {
  return (      
                  <div className="home">
      <div className="description">
        <h1><b>Welcome to Online Banking Services</b></h1>
        <p>This application is created for the purpose of the Web Development Internship tasks for GRIP under <b><u>The Sparks Foundation</u></b>.</p>
        </div>
      <div className="img">
        <img height = {350}src={icon} alt="icon"/>
      </div>
      </div>

  );
};

export default Home;
