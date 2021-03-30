import Chip from "@material-ui/core/Chip";
import moment from "moment";
import React, { useState } from "react";
import { Task } from "../../../interfaces/GlobalTypes";
import { MyButton } from "../../../utility/components";
import "./TaskDetails.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import {TaskComments} from "../../../components";
type Props = {
  selectedTask: Task;
  open: boolean;
  onClose: Function;
};
const TaskDetails: React.FC<Props> = ({ selectedTask, open, onClose }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMoreMenu = () => {
    setAnchorEl(null);
  };

  const handleUpdateTask = () => {
    closeMoreMenu();
  };

  const handleDeleteTask = () => {
    closeMoreMenu();
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className="task-details-parent">
        <div className="task-details">
          <div className="task-desc-details">
            <div className="task-details-item task-title">
              {selectedTask.TaskName}
            </div>
            <div className="task-details-item">
              <b>Description:</b> <br />
              {selectedTask.TaskDescription}
            </div>
          </div>
          <div className="task-assign-details">
            <div className="task-details-item">
              <b>Assignee:</b> <br />
              <Chip
                label={selectedTask.Assignee.Name.slice(0, 1)}
                color="secondary"
              />{" "}
              {selectedTask.Assignee.Name}
            </div>
            <div className="task-details-item">
              <b>Story points:</b> <br />
              <Chip label={selectedTask.StoryPoints} color="primary" />
            </div>
            <div className="task-details-item">
              <b>Start Date:</b> <br />
              {moment(selectedTask.StartDate).format("MM-DD-YYYY")}
            </div>
            <div className="task-details-item">
              <b>End Date:</b> <br />
              {moment(selectedTask.EndDate).format("MM-DD-YYYY")}
            </div>
          </div>
          <div>
            <MyButton tip="more" onClick={openMoreMenu}>
              <MoreVertIcon />
            </MyButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMoreMenu}
            >
              <MenuItem onClick={handleUpdateTask}>Update</MenuItem>
              <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="comments-wrapper">
            <TaskComments/>
        </div>
      </div>
    </Dialog>
  );
};

export default TaskDetails;
