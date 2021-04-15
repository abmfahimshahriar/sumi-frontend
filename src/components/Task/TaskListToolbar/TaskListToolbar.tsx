import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  filterTasks,
  filterTasksByUser,
} from "../../../store/actions/taskActions";
import { CreateTaskDialog, TaskNavigation } from "../../../components";
import {
  IAllMapStateToProps,
  ProjectState,
} from "../../../interfaces/GlobalTypes";
import "./TaskListToolbar.css";
import Avatar from "@material-ui/core/Avatar";
import { selectUser } from "../../../store/actions/projectAction";
import { MyButton } from "../../../utility/components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import {openTaskCUDialog,closeTaskCUDialog} from "../../../store/actions/taskActions";

type Props = {
  project: ProjectState;
  filterTasks: Function;
  selectUser: Function;
  filterTasksByUser: Function;
  openTaskCUDialog: Function;
  closeTaskCUDialog: Function;
};
const TaskListToolbar: React.FC<Props> = ({
  filterTasks,
  project,
  selectUser,
  filterTasksByUser,
  openTaskCUDialog,
  closeTaskCUDialog
}) => {
  const maxLen = 3;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClickOpen = () => {
    // setOpen(true);
    openTaskCUDialog();
  };

  const handleClose = () => {
    // setOpen(false);
    closeTaskCUDialog();
  };

  const openProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeProfileMenu = () => {
    setAnchorEl(null);
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
      <TaskNavigation/>
      <div className="toolbar-filter-wrapper">
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create Task
          </Button>
          <CreateTaskDialog
            open={open}
            onClose={handleClose}
          />
        </div>
        <div className="task-search-filter">
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
          {project.usersList.slice(0, maxLen).map((item) => {
            let avatarMarkup;
            if (item.ProfileImageUrl) {
              avatarMarkup = (
                <Avatar alt={item.Name} src={item.ProfileImageUrl} />
              );
            } else {
              avatarMarkup = <Avatar>{item.Name.slice(0, 1)}</Avatar>;
            }
            return (
              <div
                key={item._id}
                className={
                  item.IsSelected
                    ? "user-avatar selected-avatar"
                    : "user-avatar"
                }
              >
                <MyButton
                  tip={item.Name}
                  btnClassName={
                    item.IsSelected
                      ? "user-avatar selected-avatar"
                      : "user-avatar"
                  }
                  onClick={() => handleUserSelect(item._id)}
                >
                  {avatarMarkup}
                </MyButton>
              </div>
            );
          })}
          {project.usersList.length > maxLen && (
            <Fragment>
              <div className="user-avatar">
                <MyButton tip="more users" onClick={openProfileMenu}>
                  <Avatar>+{project.usersList.length - maxLen}</Avatar>
                </MyButton>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeProfileMenu}
              >
                {project.usersList
                  .slice(maxLen, project.usersList.length)
                  .map((item) => {
                    let avatarMarkup;
                    if (item.ProfileImageUrl) {
                      avatarMarkup = (
                        <Avatar alt={item.Name} src={item.ProfileImageUrl} />
                      );
                    } else {
                      avatarMarkup = <Avatar>{item.Name.slice(0, 1)}</Avatar>;
                    }
                    return (
                      <MenuItem
                        key={item._id}
                        onClick={() => handleUserSelect(item._id)}
                      >
                        <div style={{ marginRight: "8px" }}>{avatarMarkup}</div>
                        <div>{item.Name}</div>
                        <div>
                          <Checkbox
                            checked={item.IsSelected}
                            color="primary"
                            disabled
                          />
                        </div>
                      </MenuItem>
                    );
                  })}
              </Menu>
            </Fragment>
          )}
        </div>
      </div>
    </div>
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
  filterTasks,
  selectUser,
  filterTasksByUser,
  openTaskCUDialog,
  closeTaskCUDialog
};

export default connect(mapStateToProps, mapActionToProps)(TaskListToolbar);
