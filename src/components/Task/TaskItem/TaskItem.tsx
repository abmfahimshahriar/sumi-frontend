import React, { Fragment, useState } from "react";
import { Task } from "../../../interfaces/GlobalTypes";
import "./TaskItem.css";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import { TaskDetails } from "../../../components";
import { TASK_NAME_LIMIT } from "../../../utility/constants/stringLimitConstants";

type Props = {
  selectedTask: Task;
};
const TaskItem: React.FC<Props> = ({ selectedTask }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <div className="task-item-wrapper" onClick={handleClickOpen}>
        <div className="task-details-wrapper mb-16">
          <div className="task-name">{selectedTask.TaskName.length > TASK_NAME_LIMIT ? `${selectedTask.TaskName.slice(0, TASK_NAME_LIMIT)}...`  : selectedTask.TaskName}</div>
          <div>
            <Tooltip title="Story points" placement="top">
              <Chip label={selectedTask.StoryPoints} color="primary" />
            </Tooltip>
          </div>
        </div>
        <div className="task-details-wrapper">
          <div>{selectedTask.TaskDescription.length > TASK_NAME_LIMIT ? `${selectedTask.TaskDescription.slice(0, TASK_NAME_LIMIT)}...` : selectedTask.TaskDescription}</div>
          <div>
            <Tooltip title={selectedTask.Assignee.Name} placement="top">
              <Chip
                label={selectedTask.Assignee.Name.slice(0, 1)}
                color="secondary"
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <TaskDetails open={open} onClose={handleClose} selectedTask={selectedTask} />
    </Fragment>
  );
};

export default TaskItem;
