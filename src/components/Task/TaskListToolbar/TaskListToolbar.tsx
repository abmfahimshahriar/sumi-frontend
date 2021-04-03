import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { connect } from "react-redux";
import { filterTasks } from "../../../store/actions/taskActions";
import { CreateTaskDialog } from "../../../components";
import {
  ITaskMapStateToProps,
  TaskState,
} from "../../../interfaces/GlobalTypes";
import "./TaskListToolbar.css";

type Props = {
  task: TaskState;
  filterTasks: Function;
};
const TaskListToolbar: React.FC<Props> = ({filterTasks}) => {
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
    </div>
  );
};

const mapStateToProps = (state: ITaskMapStateToProps) => ({
  task: state.task,
  ui: state.ui,
});

const mapActionToProps = {
  filterTasks
};

export default connect(mapStateToProps, mapActionToProps)(TaskListToolbar);
