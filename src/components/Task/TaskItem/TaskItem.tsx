import React from "react";
import { Task } from "../../../interfaces/GlobalTypes";
import "./TaskItem.css";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

type Props = {
  selectedTask: Task;
};
const TaskItem: React.FC<Props> = ({ selectedTask }) => {
  return (
    <div className="task-item-wrapper">
      <div className="task-details-wrapper mb-16">
        <div className="task-name">{selectedTask.TaskName}</div>
        <div>
          <Tooltip title="Story points" placement="top">
            <Chip label={selectedTask.StoryPoints} color="primary" />
          </Tooltip>
        </div>
      </div>
      <div className="task-details-wrapper">
        <div>{selectedTask.TaskDescription}</div>
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
  );
};

export default TaskItem;
