import React, { useState } from "react";
import "./ProjectList.css";
import {
  MyCreatedProjectList,
  MyInvolvedProjectList,
  CreateProjectDialog,
} from "../../../components";
import Button from "@material-ui/core/Button";


const ProjectList = () => {
  const [open, setOpen] = useState(false);
  const isUpdate = false;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="project-list-card">
      <h1>Projects</h1>
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Create Project
        </Button>
        <CreateProjectDialog
          open={open}
          onClose={handleClose}
          isUpdate={isUpdate}
        />
      </div>
      <MyCreatedProjectList />
      <MyInvolvedProjectList />
    </div>
  );
};

export default ProjectList;
