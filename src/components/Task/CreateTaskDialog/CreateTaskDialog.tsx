import React, { FormEvent, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  CreateTaskPayload,
  IAllMapStateToProps,
  ProjectState,
  TaskState,
  UIState,
} from "../../../interfaces/GlobalTypes";
import TextField from "@material-ui/core/TextField";
import "./CreateTaskDialog.css";
import moment from "moment";
import Button from "@material-ui/core/Button";
// redux stuff
import { connect } from "react-redux";
import { inputValidator } from "../../../utility/validators/inputValidator";
import { useParams } from "react-router-dom";
import { getUsersList } from "../../../store/actions/projectAction";
import { createTask, updateTask } from "../../../store/actions/taskActions";
import { UserList } from "../../../components";

type Props = {
  open: boolean;
  onClose: () => void;
  project: ProjectState;
  ui: UIState;
  getUsersList: Function;
  createTask: Function;
  task: TaskState;
  updateTask: Function;
};

interface ParamTypes {
  projectId: string;
  sprintId: string;
}

const CreateTaskDialog: React.FC<Props> = ({
  onClose,
  getUsersList,
  project,
  createTask,
  updateTask,
  task,
}) => {
  const { projectId, sprintId } = useParams<ParamTypes>();
  const [dialogTitle, setDialogTile] = useState("Create Task");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [storyPoints, setStoryPoints] = useState<number>(0);
  const [startDate, setStartDate] = useState(
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  const [formErrors, setFormErrors] = useState<any>({});
  const [assignedUserError, setAssignedUserError] = useState<string[]>([]);

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
    if (task.isUpdate && task.selectedTaskToUpdate) {
      setDialogTile("Update Task");
      setTaskName(task.selectedTaskToUpdate.TaskName);
      setTaskDescription(task.selectedTaskToUpdate.TaskDescription);
      setStoryPoints(task.selectedTaskToUpdate.StoryPoints);
      setStartDate(task.selectedTaskToUpdate.StartDate);
      setEndDate(task.selectedTaskToUpdate.EndDate);
      getUsersList(true, "", task.selectedTaskToUpdate.Assignee, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.isUpdate, task.selectedTaskToUpdate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "taskName") setTaskName(value);
    if (name === "taskDescription") setTaskDescription(value);
    if (name === "storyPoints") setStoryPoints(+value);
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const handleCreateTask = () => {
    const assignedUser = project.usersList.find(
      (item) => item.IsSelected === true
    );
    if (assignedUser) {
      const taskData: CreateTaskPayload = {
        ProjectId: projectId,
        SprintId: sprintId,
        TaskName: taskName,
        TaskDescription: taskDescription,
        StartDate: startDate,
        EndDate: endDate,
        StoryPoints: storyPoints,
        Assignee: assignedUser,
      };
      createTask(taskData);
      setTaskName("");
      setTaskDescription("");
      setStoryPoints(0);
      setAssignedUserError([]);
    }
  };

  const handleUpdateTask = () => {
    const assignedUser = project.usersList.find(
      (item) => item.IsSelected === true
    );
    if (assignedUser) {
      const taskData: CreateTaskPayload = {
        ProjectId: projectId,
        SprintId: sprintId,
        TaskId: task.selectedTaskToUpdate._id,
        TaskName: taskName,
        TaskDescription: taskDescription,
        StartDate: startDate,
        EndDate: endDate,
        StoryPoints: storyPoints,
        Assignee: assignedUser,
      };
      updateTask(taskData);
      setTaskName("");
      setTaskDescription("");
      setStoryPoints(0);
      setAssignedUserError([]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assignedUser = project.usersList.find(
      (item) => item.IsSelected === true
    );
    if(!assignedUser) setAssignedUserError(["You must assign this task to an user"]);

    const errorsObject = inputValidator(inputs);
    setFormErrors(errorsObject);
    if (!errorsObject.hasError && assignedUser) {
      if (task.isUpdate) {
        handleUpdateTask();
      } else {
        handleCreateTask();
      }
      onClose();
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={task.openTaskCUDialog}
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
              multiline
              rows={4}
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
                task.isUpdate ? task.selectedTaskToUpdate.StartDate : new Date().toISOString()
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
                task.isUpdate ? task.selectedTaskToUpdate.EndDate : new Date().toISOString()
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
              placeholder="Story points"
              label="Story points"
              error={formErrors.storyPoints?.errors.length > 0 ? true : false}
              helperText={
                formErrors.storyPoints?.errors.length > 0
                  ? formErrors.storyPoints?.errors[0]
                  : null
              }
              onChange={handleInputChange}
            />
          </div>

          <div className="form-item">
            <UserList fromTask={true} />
          </div>

          <div>
            <ul>
              {assignedUserError.length > 0 &&
                assignedUserError.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
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

const mapStateToProps = (state: IAllMapStateToProps) => ({
  project: state.project,
  sprint: state.sprint,
  task: state.task,
  user: state.user,
  ui: state.ui,
});

const mapActionToProps = {
  getUsersList,
  createTask,
  updateTask,
};

export default connect(mapStateToProps, mapActionToProps)(CreateTaskDialog);
