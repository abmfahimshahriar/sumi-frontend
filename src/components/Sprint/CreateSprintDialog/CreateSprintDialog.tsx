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
  createSprint,
  updateSprint,
} from "../../../store/actions/sprintActions";
import { inputValidator } from "../../../utility/validators/inputValidator";
import { useParams } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ENTITY_END_DATE, ENTITY_END_DATE_MIN, ENTITY_START_DATE, ENTITY_START_DATE_MIN, ENTITY_TITLE, ENTITY_TITLE_MIN } from "../../../utility/constants/formConstants";

type Props = {
  open: boolean;
  onClose: () => void;
  isUpdate: boolean;
  createSprint: Function;
  project: ProjectState;
  ui: UIState;
  selectedSprint?: Sprint;
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
}

const CreateSprintDialog: React.FC<Props> = ({
  open,
  onClose,
  isUpdate,
  ui,
  selectedSprint,
  createSprint,
  updateSprint,
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
  const [taskBucketerror, setTaskBucketError] = useState<string[]>([]);

  const inputs = [
    {
      fieldValue: sprintName,
      fieldName: "sprintName",
      validations: ["required"],
      minLength: ENTITY_TITLE_MIN,
      maxLength: ENTITY_TITLE,
    },
    {
      fieldValue: startDate,
      fieldName: "startDate",
      validations: ["required"],
      minLength: ENTITY_START_DATE_MIN,
      maxLength: ENTITY_START_DATE,
    },
    {
      fieldValue: endDate,
      fieldName: "endDate",
      validations: ["required"],
      minLength: ENTITY_END_DATE_MIN,
      maxLength: ENTITY_END_DATE,
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

  useEffect(() => {
    if(taskBuckets.length > 0 && !isUpdate) {
      handleTaskBucketValidation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskBuckets]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "sprintName") setSprintName(value);
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const handleCreateSprint = () => {
    handleTaskBucketValidation();
    const sprintData: CreateSprintPayload = {
      ProjectId: projectId,
      SprintName: sprintName,
      StartDate: startDate,
      EndDate: endDate,
      TaskBuckets: taskBuckets,
      StartBucket: startBucket,
      EndBucket: endBucket,
    };
    createSprint(sprintData);
    setSprintName("");
    setTaskBuckets([]);
    setStartBucket("");
    setEndBucket("");
  };

  const handleUpdateSprint = () => {
    const sprintData: CreateSprintPayload = {
      ProjectId: projectId,
      SprintId: selectedSprint?._id,
      SprintName: sprintName,
      StartDate: startDate,
      EndDate: endDate,
      TaskBuckets: taskBuckets,
    };
    updateSprint(sprintData);
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
    if (!errorsObject.hasError && taskBucketerror.length === 0) {
      if (isUpdate) {
        handleUpdateSprint();
      } else {
        handleCreateSprint();
      }
      onClose();
    }
  };

  const handleTaskBucketValidation = () => {
    const tempTaskBucketErrors: string[] = [];
    if (!startBucket)
      tempTaskBucketErrors.push("You must create / select one start bucket");
    if (!endBucket)
      tempTaskBucketErrors.push("You must create / select one end bucket");
    setTaskBucketError([...tempTaskBucketErrors]);
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
          {isUpdate && (
            <div>
              <h4>Already assigned task buckets for this sprint</h4>
              {selectedSprint?.TaskBuckets.map((item) => {
                return (
                  <div
                    key={item.TaskBucketId}
                    className="existing-task-bucket-list"
                  >
                    <ChevronRightIcon />
                    {item.TaskBucketName}{" "}
                    {item.TaskBucketId === selectedSprint.StartBucket &&
                      "(start bucket)"}
                    {item.TaskBucketId === selectedSprint.EndBucket &&
                      "(end bucket)"}
                  </div>
                );
              })}
            </div>
          )}
          <div>
            <TaskBucketList
              onSelectTaskBucket={handleTaskBucketList}
              isUpdate={isUpdate}
            />
          </div>
          <div>
            <ul>
              {taskBucketerror.length > 0 &&
                taskBucketerror.map((item, index) => <li key={index}>{item}</li>)}
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

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
  ui: state.ui,
});

const mapActionToProps = {
  createSprint,
  updateSprint,
};

export default connect(mapStateToProps, mapActionToProps)(CreateSprintDialog);
