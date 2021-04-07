import React from "react";
import "./LandingPage.css";
import { UpperPart, MiddlePart, LowerPart } from "../../components";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-wrapper">
      <UpperPart />
      <MiddlePart/>
      <LowerPart/>
    </div>
  );
};

export default LandingPage;
