import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  filterTasks,
  filterTasksByUser,
} from "../../../store/actions/taskActions";
import { CreateTaskDialog } from "../../../components";
import {
  IProjectMapStateToProps,
  ProjectState,
} from "../../../interfaces/GlobalTypes";
import "./TaskListToolbar.css";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { selectUser } from "../../../store/actions/projectAction";

type Props = {
  project: ProjectState;
  filterTasks: Function;
  selectUser: Function;
  filterTasksByUser: Function;
};
const TaskListToolbar: React.FC<Props> = ({
  filterTasks,
  project,
  selectUser,
  filterTasksByUser,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isUpdate = false;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "searchText") {
      setSearchText(value);
      setTimeout(() => {
        filterTasks(value);
      }, 2000);
    }
  };

  const handleUserSelect = (userId: string) => {
    selectUser(userId);
    const selectedUsers = project.usersList.filter(
      (item) => item.IsSelected === true
    );
    filterTasksByUser(selectedUsers);
  };

  return (
    <div className="toolbar-wrapper">
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Create Task
        </Button>
        <CreateTaskDialog
          open={open}
          onClose={handleClose}
          isUpdate={isUpdate}
        />
      </div>
      <div style={{ marginLeft: "32px" }}>
        <TextField
          className="full-width"
          id="searchText"
          name="searchText"
          type="text"
          value={searchText}
          placeholder="Search tasks"
          label="Search tasks"
          variant="outlined"
          onChange={handleInputChange}
        />
      </div>
      <div className="users-avatar-wrapper">
        {project.usersList.map((item) => {
          let avatarMarkup;
          if (item.ProfileImageUrl) {
            avatarMarkup = (
              <Avatar
                key={item._id}
                alt={item.Name}
                src={item.ProfileImageUrl}
              />
            );
          } else {
            avatarMarkup = (
              <Avatar key={item._id}>{item.Name.slice(0, 1)}</Avatar>
            );
          }
          return (
            <div
              className={
                item.IsSelected ? "user-avatar selected-avatar" : "user-avatar"
              }
              onClick={() => handleUserSelect(item._id)}
            >
              <Tooltip title={item.Name}>{avatarMarkup}</Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
  ui: state.ui,
});

const mapActionToProps = {
  filterTasks,
  selectUser,
  filterTasksByUser,
};

export default connect(mapStateToProps, mapActionToProps)(TaskListToolbar);
