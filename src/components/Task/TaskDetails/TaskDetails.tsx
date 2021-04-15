import Chip from "@material-ui/core/Chip";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Task } from "../../../interfaces/GlobalTypes";
import { MyButton } from "../../../utility/components";
import "./TaskDetails.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import { TaskComments } from "../../../components";
import { useParams } from "react-router-dom";

type Props = {
  selectedTask: Task;
  open: boolean;
  onClose: Function;
};

interface ParamTypes {
  projectId: string;
  sprintId: string;
  taskId: string;
}

const TaskDetails: React.FC<Props> = ({ selectedTask, open, onClose }) => {
  const { projectId, sprintId, taskId } = useParams<ParamTypes>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(open);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [oldPath, setOldPath] = useState(`/sprints/${projectId}/${sprintId}`);
  const openMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    handleDialogOpen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open,window.location.pathname]);

  const handleDialogOpen = () => {
    const newUrl = window.location.pathname;
    if (taskId === selectedTask._id && newUrl !== oldPath) {
      setOpenDialog(true);
    }
    else setOpenDialog(open);
  }

  // const handleOpen = () => {
  //   let oldUrl = window.location.pathname;
  //   const newUrl = `/sprints/${projectId}/${sprintId}/${taskId}`;
  //   if (oldUrl === newUrl) oldUrl =  `/sprints/${projectId}/${sprintId}`;
  //   window.history.pushState(null, "", newUrl);
  //   setOpenDialog(true);
  //   setOldPath(oldUrl);
  //   setNewPath(newUrl);
  // };

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
    window.history.pushState(null, "", oldPath);
    setOpenDialog(false);
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openDialog}
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
          <TaskComments open={openDialog} selectedTask={selectedTask} />
        </div>
      </div>
    </Dialog>
  );
};

export default TaskDetails;
