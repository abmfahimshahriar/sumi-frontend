import React, { FormEvent, useEffect, useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {
  CreateProjectPayload,
  IProjectMapStateToProps,
  Project,
  ProjectState,
  UIState,
} from "../../../interfaces/GlobalTypes";
import TextField from "@material-ui/core/TextField";
import "./CreateProjectDialog.css";
import moment from "moment";
import Button from "@material-ui/core/Button";

// redux stuff
import { connect } from "react-redux";
import {
  getUsersList,
  createProject,
  updateProject,
  emptyUserslist,
} from "../../../store/actions/projectAction";
import { UserList } from "../..";

type Props = {
  open: boolean;
  onClose: () => void;
  isUpdate: boolean;
  getUsersList: Function;
  createProject: Function;
  project: ProjectState;
  ui: UIState;
  selectedProject?: Project;
  updateProject: Function;
  emptyUserslist: Function;
};

const CreateProjectDialog: React.FC<Props> = ({
  open,
  onClose,
  isUpdate,
  getUsersList,
  project,
  ui,
  createProject,
  selectedProject,
  updateProject,
  emptyUserslist,
}) => {
  const [dialogTitle, setDialogTile] = useState("Create Project");
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState(
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  const [searchText, setSearchText] = useState("");

  const handleClose = () => {
    emptyUserslist();
    onClose();
  };

  useEffect(() => {
    if (isUpdate && selectedProject) {
      setDialogTile("Update Project");
      setProjectName(selectedProject.ProjectName);
      setStartDate(selectedProject.StartDate);
      setEndDate(selectedProject.EndDate);
      getUsersList(true, "", selectedProject.InvolvedUsers);
      console.log("is update called");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "projectName") setProjectName(value);
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
    if (name === "searchUserText") {
      setSearchText(value);
      getUsersList(false, value);
    }
  };

  const handleCreateProject = () => {
    const involvedUsers = project.usersList.filter(
      (item) => item.IsSelected === true
    );
    const projectData: CreateProjectPayload = {
      ProjectName: projectName,
      StartDate: startDate,
      EndDate: endDate,
      InvolvedUsers: involvedUsers,
    };
    // console.log(projectData);
    createProject(projectData);
  };

  const handleUpdateProject = () => {
    const involvedUsers = project.usersList.filter(
      (item) => item.IsSelected === true
    );
    const projectData: CreateProjectPayload = {
      ProjectName: projectName,
      StartDate: startDate,
      EndDate: endDate,
      InvolvedUsers: involvedUsers,
    };
    // console.log(projectData);
    updateProject(projectData, selectedProject?._id);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdate) {
      handleUpdateProject();
    } else {
      handleCreateProject();
    }
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className="create-project-dialog-wrapper">
        <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
        <form
          className="create-project-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="form-item">
            <TextField
              className="full-width"
              id="projectName"
              name="projectName"
              type="text"
              value={projectName}
              placeholder="Project name"
              label="Project name"
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
                isUpdate ? selectedProject?.StartDate : new Date().toISOString()
              ).format("YYYY-MM-DD")}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
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
                isUpdate ? selectedProject?.EndDate : new Date().toISOString()
              ).format("YYYY-MM-DD")}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="form-item">
            <TextField
              className="full-width"
              id="searchUserText"
              name="searchUserText"
              type="text"
              value={searchText}
              placeholder="Search users"
              label="Search users"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <UserList />
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

export default connect(mapStateToProps, mapActionToProps)(CreateProjectDialog);
