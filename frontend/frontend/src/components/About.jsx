import React from "react";
import aboutimage from "../images/about.png";
function About() {
  return (
    <div id="about">
      <div className="about-image">
        <img src={aboutimage} alt="" />
      </div>
      <div className="about-text">
        <h1>LEARN MORE ABOUT US</h1>
        <p>
          Hello! I'm a sports coach for 5 years. I have some master's degree of
          deadlift, bench press and boxing. Individual approach to each client's
          it's my job. Also, in addition to training programs, I prescribe a
          nutrition program for better effect.
        </p>
        <button>Read More</button>
      </div>
    </div>
  );
}

export default About;
