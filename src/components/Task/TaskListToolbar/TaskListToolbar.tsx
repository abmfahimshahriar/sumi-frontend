import Button from "@material-ui/core/Button/Button";
import React, { useState } from "react";
import { CreateTaskDialog } from "../../../components";
import "./TaskListToolbar.css";

const TaskListToolbar = () => {
  const [open, setOpen] = useState(false);
  const isUpdate = false;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="toolbar-wrapper">
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Create Task
        </Button>
        <CreateTaskDialog
          open={open}
          onClose={handleClose}
          isUpdate={isUpdate}
        />
      </div>
    </div>
  );
};

export default TaskListToolbar;
