import React from "react";
import "./ProjectList.css";
import {
  MyCreatedProjectList,
  MyInvolvedProjectList,
} from "../../../components";

const ProjectList = () => {
  return (
    <div className="project-list-card">
      <h1>Projects</h1>
      <MyCreatedProjectList />
      <MyInvolvedProjectList />
    </div>
  );
};

export default ProjectList;
