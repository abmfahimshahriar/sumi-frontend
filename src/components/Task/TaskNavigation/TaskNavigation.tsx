import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  ITaskMapStateToProps,
  TaskState,
  UIState,
} from "../../../interfaces/GlobalTypes";
import { LinkSkeleton, TitleSkeleton } from "../../../utility/components";
import "./TaskNavigation.css";

type Props = {
  task: TaskState;
  ui: UIState;
};
const TaskNavigation: React.FC<Props> = ({ task, ui }) => {
  return (
    <div className="task-navigation-wrapper">
      <div className="task-navigation-link">
        {ui.globalLoading ? (
          <LinkSkeleton />
        ) : (
          <div className="navigation-link">
            <Link to="/projects" style={{ marginRight: "8px" }}>
              Projects
            </Link>
            \
            <Link
              to={`/projects/${task.projectDetails._id}`}
              style={{ margin: "0 8px" }}
            >
              {task.projectDetails.ProjectName}
            </Link>
            \
            <Link
              to={`/sprints/${task.projectDetails._id}/${task.SprintDetails._id}`}
              style={{ marginLeft: "8px" }}
            >
              {task.SprintDetails.SprintName}
            </Link>
          </div>
        )}
        {ui.globalLoading ? (
          <TitleSkeleton/>
        ) : (
          <div className="navigation-title">
            {task.SprintDetails.SprintName}
          </div>
        )}
      </div>
      <div className="task-navigation-sprint-details">
        {ui.globalLoading ? (
          <LinkSkeleton />
        ) : (
          <div>
            <b>Start Date</b> :{" "}
            {moment(task.SprintDetails.StartDate).format("MM-DD-YYYY")}
          </div>
        )}
        {ui.globalLoading ? (
          <LinkSkeleton />
        ) : (
          <div>
            <b>End Date</b> :{" "}
            {moment(task.SprintDetails.EndDate).format("MM-DD-YYYY")}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: ITaskMapStateToProps) => ({
  task: state.task,
  ui: state.ui,
});

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(TaskNavigation);
