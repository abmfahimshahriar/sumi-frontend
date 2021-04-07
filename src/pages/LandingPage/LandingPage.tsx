import React from "react";
import "./LandingPage.css";
import { UpperPart, MiddlePart } from "../../components";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-wrapper">
      <UpperPart />
      <MiddlePart/>
    </div>
  );
};

export default LandingPage;
