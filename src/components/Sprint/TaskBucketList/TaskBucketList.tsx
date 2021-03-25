import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import "./TaskBucketList.css";
import { v4 as uuidv4 } from "uuid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

interface TaskBucket {
  TaskBucketId: string;
  TaskBucketName: string;
}
const TaskBucketList = () => {
  const [taskBucketName, setTaskBucketName] = useState("");
  const [taskBuckets, setTaskBuckets] = useState<TaskBucket[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "taskBucketName") setTaskBucketName(value);
  };

  const handleAddTaskBucket = () => {
    const taskBucket: TaskBucket = {
      TaskBucketId: uuidv4(),
      TaskBucketName: taskBucketName,
    };
    setTaskBuckets([...taskBuckets, taskBucket]);
    setTaskBucketName("");
  };

  const handleRemoveTaskBucket = (taskBucket: TaskBucket) => {
    const filteredTaskBuckets = taskBuckets.filter(
      (item) => item.TaskBucketId !== taskBucket.TaskBucketId
    );
    setTaskBuckets([...filteredTaskBuckets]);
  };
  return (
    <div className="task-bucket-list-wrapper">
      <div className="task-bucket-input">
        <TextField
          className="task-bucket-text-field"
          id="taskBucketName"
          name="taskBucketName"
          type="text"
          value={taskBucketName}
          placeholder="Task bucket name"
          label="Task bucket name"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleAddTaskBucket}
        >
          Add
        </Button>
      </div>
      <div className="task-bucket-list">
        {taskBuckets.map((item) => {
          return (
            <div key={item.TaskBucketId} className="task-bucket-list-item">
              <div className="task-bucket-item-title">
                <ChevronRightIcon />
                <div>{item.TaskBucketName}</div>
              </div>
              <IconButton onClick={() => handleRemoveTaskBucket(item)}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBucketList;
