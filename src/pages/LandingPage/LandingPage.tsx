import React from "react";
import "./LandingPage.css";
import { UpperPart, MiddlePart, LowerPart, Footer } from "../../components";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-wrapper">
      <UpperPart />
      <MiddlePart/>
      <LowerPart/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
