import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import "./TaskBucketList.css";
import { v4 as uuidv4 } from "uuid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";

interface TaskBucket {
  TaskBucketId: string;
  TaskBucketName: string;
  IsStartBucket: boolean;
  IsEndBucket: boolean;
}

type Props = {
    onSelectTaskBucket: Function;
}
const TaskBucketList: React.FC<Props> = ({onSelectTaskBucket}) => {
  const [taskBucketName, setTaskBucketName] = useState("");
  const [taskBuckets, setTaskBuckets] = useState<TaskBucket[]>([]);

  const handleCheckChange = (taskBucket: TaskBucket, type: string) => {
    const tempTaskBuckets = [...taskBuckets];
    if (type === "start") {
      const hasOneStartBucket = tempTaskBuckets.find(
        (item) => item.IsStartBucket === true
      );
      if (hasOneStartBucket) hasOneStartBucket.IsStartBucket = false;
      for (let i in tempTaskBuckets) {
        if (tempTaskBuckets[i].TaskBucketId === taskBucket.TaskBucketId) {
          taskBuckets[i].IsEndBucket = false;
          taskBuckets[i].IsStartBucket = !taskBuckets[i].IsStartBucket;
          break;
        }
      }
    } else {
      const hasOneEndBucket = tempTaskBuckets.find(
        (item) => item.IsEndBucket === true
      );
      if (hasOneEndBucket) hasOneEndBucket.IsEndBucket = false;
      for (let j in tempTaskBuckets) {
        if (tempTaskBuckets[j].TaskBucketId === taskBucket.TaskBucketId) {
          taskBuckets[j].IsEndBucket = !taskBuckets[j].IsEndBucket;
          taskBuckets[j].IsStartBucket = false;
          break;
        }
      }
    }
    setTaskBuckets([...tempTaskBuckets]);
    onSelectTaskBucket(taskBuckets);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "taskBucketName") setTaskBucketName(value);
  };

  const handleAddTaskBucket = () => {
    const taskBucket: TaskBucket = {
      TaskBucketId: uuidv4(),
      TaskBucketName: taskBucketName,
      IsStartBucket: false,
      IsEndBucket: false,
    };
    setTaskBuckets([...taskBuckets, taskBucket]);
    setTaskBucketName("");
    onSelectTaskBucket(taskBuckets);
  };

  const handleRemoveTaskBucket = (taskBucket: TaskBucket) => {
    const filteredTaskBuckets = taskBuckets.filter(
      (item) => item.TaskBucketId !== taskBucket.TaskBucketId
    );
    setTaskBuckets([...filteredTaskBuckets]);
    onSelectTaskBucket(taskBuckets);
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
              <div className="task-bucket-list-upper">
                <div className="task-bucket-item-title">
                  <ChevronRightIcon />
                  <div>{item.TaskBucketName}</div>
                </div>
                <IconButton onClick={() => handleRemoveTaskBucket(item)}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <div className="task-bucket-list-upper">
                <div>
                  <Checkbox
                    checked={item.IsStartBucket}
                    onChange={() => handleCheckChange(item, "start")}
                  />{" "}
                  Start Bucket
                </div>
                <div>
                  <Checkbox
                    checked={item.IsEndBucket}
                    onChange={() => handleCheckChange(item, "end")}
                  />{" "}
                  End Bucket
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBucketList;
