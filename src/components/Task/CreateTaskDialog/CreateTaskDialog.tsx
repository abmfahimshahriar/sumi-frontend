import React, { FormEvent, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Assignee,
  CreateSprintPayload,
  CreateTaskPayload,
  IProjectMapStateToProps,
  ProjectState,
  Sprint,
  Task,
  UIState,
} from "../../../interfaces/GlobalTypes";
import TextField from "@material-ui/core/TextField";
import "./CreateTaskDialog.css";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { TaskBucketList } from "../../../components";
// redux stuff
import { connect } from "react-redux";
import {
  createSprint,
  updateSprint,
} from "../../../store/actions/sprintActions";
import { inputValidator } from "../../../utility/validators/inputValidator";
import { useParams } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

type Props = {
  open: boolean;
  onClose: () => void;
  isUpdate: boolean;
  createSprint: Function;
  project: ProjectState;
  ui: UIState;
  selectedTask?: Task;
  updateSprint: Function;
};

interface TaskBucket {
  TaskBucketId: string;
  TaskBucketName: string;
  IsStartBucket: boolean;
  IsEndBucket: boolean;
}

interface ParamTypes {
  projectId: string;
  sprintId: string;
}

const CreateTaskDialog: React.FC<Props> = ({
  open,
  onClose,
  isUpdate,
  ui,
  selectedTask,
  createSprint,
  updateSprint,
}) => {
  const { projectId, sprintId } = useParams<ParamTypes>();
  const [dialogTitle, setDialogTile] = useState("Create Task");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [storyPoints, setStoryPoints] = useState<number>(0);
  const [assignee, setAssignee] = useState<Assignee>({
    Email: "",
    Name: "",
  });
  const [startDate, setStartDate] = useState(
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  const [formErrors, setFormErrors] = useState<any>({});

  const inputs = [
    {
      fieldValue: taskName,
      fieldName: "taskName",
      validations: ["required"],
      minLength: 8,
      maxLength: 20,
    },
    {
      fieldValue: taskDescription,
      fieldName: "taskDescription",
      validations: ["required"],
      minLength: 8,
      maxLength: 20,
    },
    {
      fieldValue: storyPoints,
      fieldName: "storyPoints",
      validations: ["required"],
      minLength: 8,
      maxLength: 20,
    },
    {
      fieldValue: startDate,
      fieldName: "startDate",
      validations: ["required"],
      minLength: 8,
      maxLength: 20,
    },
    {
      fieldValue: endDate,
      fieldName: "endDate",
      validations: ["required"],
      minLength: 4,
      maxLength: 10,
    },
  ];

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isUpdate && selectedTask) {
      setDialogTile("Update Task");
      setTaskName(selectedTask.TaskName);
      setTaskDescription(selectedTask.TaskDescription);
      setStoryPoints(selectedTask.StoryPoints);
      setStartDate(selectedTask.StartDate);
      setEndDate(selectedTask.EndDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "taskName") setTaskName(value);
    if (name === "taskDescription") setTaskDescription(value);
    if (name === "storyPoints") setStoryPoints(+value);
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const handleCreateSprint = () => {
    const taskData: CreateTaskPayload = {
      ProjectId: projectId,
      SprintId: sprintId,
      TaskName: taskName,
      TaskDescription: taskDescription,
      StartDate: startDate,
      EndDate: endDate,
      StoryPoints: storyPoints,
      Assignee: assignee,
    };
    // createSprint(taskData);
  };

  const handleUpdateSprint = () => {
    const taskData: CreateTaskPayload = {
      ProjectId: projectId,
      SprintId: sprintId,
      TaskName: taskName,
      TaskDescription: taskDescription,
      StartDate: startDate,
      EndDate: endDate,
      StoryPoints: storyPoints,
      Assignee: assignee,
    };
    // updateSprint(taskData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsObject = inputValidator(inputs);
    setFormErrors(errorsObject);
    if (!errorsObject.hasError) {
      if (isUpdate) {
        handleUpdateSprint();
      } else {
        handleCreateSprint();
      }
      onClose();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className="create-sprint-dialog-wrapper">
        <h2>{dialogTitle}</h2>
        <form
          className="create-sprint-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="form-item">
            <TextField
              className="full-width"
              id="taskName"
              name="taskName"
              type="text"
              value={taskName}
              placeholder="Task name"
              label="Task name"
              error={formErrors.taskName?.errors.length > 0 ? true : false}
              helperText={
                formErrors.taskName?.errors.length > 0
                  ? formErrors.taskName?.errors[0]
                  : null
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <TextField
              className="full-width"
              id="taskDescription"
              name="taskDescription"
              type="text"
              value={taskDescription}
              placeholder="Task description"
              label="Task description"
              error={
                formErrors.taskDescription?.errors.length > 0 ? true : false
              }
              helperText={
                formErrors.taskDescription?.errors.length > 0
                  ? formErrors.taskDescription?.errors[0]
                  : null
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <TextField
              className="full-width"
              id="startDate"
              name="startDate"
              label="Start date"
              type="date"
              defaultValue={moment(
                isUpdate ? selectedTask?.StartDate : new Date().toISOString()
              ).format("YYYY-MM-DD")}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={formErrors.startDate?.errors.length > 0 ? true : false}
              helperText={
                formErrors.startDate?.errors.length > 0
                  ? formErrors.startDate?.errors[0]
                  : null
              }
            />
          </div>
          <div className="form-item">
            <TextField
              className="full-width"
              id="endDate"
              name="endDate"
              label="End date"
              type="date"
              defaultValue={moment(
                isUpdate ? selectedTask?.EndDate : new Date().toISOString()
              ).format("YYYY-MM-DD")}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={formErrors.endDate?.errors.length > 0 ? true : false}
              helperText={
                formErrors.endDate?.errors.length > 0
                  ? formErrors.endDate?.errors[0]
                  : null
              }
            />
          </div>
          <div className="form-item">
            <TextField
              className="full-width"
              id="storyPoints"
              name="storyPoints"
              type="number"
              value={storyPoints}
              placeholder="Task description"
              label="Task description"
              error={formErrors.storyPoints?.errors.length > 0 ? true : false}
              helperText={
                formErrors.storyPoints?.errors.length > 0
                  ? formErrors.storyPoints?.errors[0]
                  : null
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item btn-container">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
  ui: state.ui,
});

const mapActionToProps = {
  createSprint,
  updateSprint,
};

export default connect(mapStateToProps, mapActionToProps)(CreateTaskDialog);
