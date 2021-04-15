import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ITaskMapStateToProps } from "../../../interfaces/GlobalTypes";
import { useParams } from "react-router-dom";
import { getTasks, getUsersListWithDetails } from "../../../store/actions/taskActions";
import "./TaskList.css";
import { TaskDnD, TaskListToolbar } from "../../../components";

interface ParamTypes {
  projectId: string;
  sprintId: string;
}

type Props = {
  getTasks: Function;
  getUsersListWithDetails: Function;
};

const TaskList: React.FC<Props> = ({ getTasks, getUsersListWithDetails }) => {
  const { projectId, sprintId } = useParams<ParamTypes>();
  useEffect(() => {
    getTasks(sprintId);
    getUsersListWithDetails(projectId, sprintId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
  return (
      <div className="task-list-parent">
          <TaskListToolbar/>
          <TaskDnD/>
      </div>
  );
};

const mapStateToProps = (state: ITaskMapStateToProps) => ({
  task: state.task,
  ui: state.ui,
});

const mapActionToProps = {
  getTasks,
  getUsersListWithDetails,
};
export default connect(mapStateToProps, mapActionToProps)(TaskList);
