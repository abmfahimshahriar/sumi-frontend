import React from "react";
import "./UpperPart.css";
import animatedImage from "../../../utility/images/animated.jpg";
const UpperPart = () => {
  return (
    <div className="upper-part-wrapper">
      <div className="headline-text">
        <h1>The project management tool you need.</h1>
        <p className="landing-page-paragraph">
          Sumi TaskIt is suitable for administering any team to plan, track,
          organize and generate an overview of the project. Promote more
          efficiency in your work and ease the process of communication by
          collaborating with other members of your team.
        </p>
      </div>
      <div className="animated-img-wrapper">
        <img className="animated-img" src={animatedImage} alt="animated" />
      </div>
    </div>
  );
};

export default UpperPart;
