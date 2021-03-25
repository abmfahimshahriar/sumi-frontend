import React, { FormEvent, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  CreateSprintPayload,
  IProjectMapStateToProps,
  ProjectState,
  Sprint,
  UIState,
} from "../../../interfaces/GlobalTypes";
import TextField from "@material-ui/core/TextField";
import "./CreateSprintDialog.css";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { TaskBucketList } from "../../../components";
// redux stuff
import { connect } from "react-redux";
import {
  getUsersList,
  createProject,
  updateProject,
  emptyUserslist,
} from "../../../store/actions/projectAction";
import { inputValidator } from "../../../utility/validators/inputValidator";
import { useParams } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  isUpdate: boolean;
  getUsersList: Function;
  createProject: Function;
  project: ProjectState;
  ui: UIState;
  selectedSprint?: Sprint;
  updateProject: Function;
  emptyUserslist: Function;
};

interface TaskBucket {
  TaskBucketId: string;
  TaskBucketName: string;
  IsStartBucket: boolean;
  IsEndBucket: boolean;
}

interface ParamTypes {
  projectId: string;
}

const CreateSprintDialog: React.FC<Props> = ({
  open,
  onClose,
  isUpdate,
  getUsersList,
  project,
  ui,
  createProject,
  selectedSprint,
  updateProject,
  emptyUserslist,
}) => {
  const { projectId } = useParams<ParamTypes>();
  const [dialogTitle, setDialogTile] = useState("Create Sprint");
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState(
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  const [startBucket, setStartBucket] = useState("");
  const [endBucket, setEndBucket] = useState("");
  const [taskBuckets, setTaskBuckets] = useState<TaskBucket[]>([]);
  const [formErrors, setFormErrors] = useState<any>({});

  const inputs = [
    {
      fieldValue: sprintName,
      fieldName: "sprintName",
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
    if (isUpdate && selectedSprint) {
      setDialogTile("Update Sprint");
      setSprintName(selectedSprint.SprintName);
      setStartDate(selectedSprint.StartDate);
      setEndDate(selectedSprint.EndDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "sprintName") setSprintName(value);
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const handleCreateSprint = () => {
    
    const sprintData: CreateSprintPayload = {
      ProjectId: projectId,
      SprintName: sprintName,
      StartDate: startDate,
      EndDate: endDate,
      TaskBuckets: taskBuckets,
      StartBucket: startBucket,
      EndBucket: endBucket,
    };
    console.log(sprintData);
    // createProject(sprintData);
  };

  const handleUpdateSprint = () => {
    const sprintData: CreateSprintPayload = {
      ProjectId: projectId,
      SprintName: sprintName,
      StartDate: startDate,
      EndDate: endDate,
      TaskBuckets: taskBuckets,
      StartBucket: startBucket,
      EndBucket: endBucket,
    };
    console.log(sprintData);
    // updateProject(sprintData, selectedSprint?._id);
  };

  const handleTaskBucketList = (taskBuckets: TaskBucket[]) => {
    setTaskBuckets([...taskBuckets]);
    const startBucket = taskBuckets.find((item) => item.IsStartBucket === true);
    if (startBucket) setStartBucket(startBucket.TaskBucketId);
    const endBucket = taskBuckets.find((item) => item.IsEndBucket === true);
    if (endBucket) setEndBucket(endBucket.TaskBucketId);
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
              id="sprintName"
              name="sprintName"
              type="text"
              value={sprintName}
              placeholder="Sprint name"
              label="Sprint name"
              error={formErrors.sprintName?.errors.length > 0 ? true : false}
              helperText={
                formErrors.sprintName?.errors.length > 0
                  ? formErrors.sprintName?.errors[0]
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
                isUpdate ? selectedSprint?.StartDate : new Date().toISOString()
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
                isUpdate ? selectedSprint?.EndDate : new Date().toISOString()
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

          <div>
            <TaskBucketList onSelectTaskBucket={handleTaskBucketList} />
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
  getUsersList,
  createProject,
  updateProject,
  emptyUserslist,
};

export default connect(mapStateToProps, mapActionToProps)(CreateSprintDialog);
