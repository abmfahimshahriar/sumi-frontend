import React from "react";
import { Project } from "../../../interfaces/GlobalTypes";
import "./ProjectListCard.css";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
type Props = {
  project: Project;
};
const ProjectListCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="single-project-list-card-wrapper">
      <div className="project-title">{project.ProjectName}</div>
      <div className="project-details-wrapper">
        <div className="project-date-wrapper">
          <div className="project-date">
            <CalendarTodayIcon /> {moment(project.StartDate).format('DD-MM-YYYY')}
          </div>
          <div className="date-divider">{"-"}</div>
          <div className="project-date">
            <CalendarTodayIcon /> {moment(project.EndDate).format('DD-MM-YYYY')}
          </div>
        </div>
        <div className="story-points-wrapper">
          <div className="story-point">
            <Tooltip title="Total story points" placement="top">
              <Chip label={project.TotalStoryPoints} color="primary" />
            </Tooltip>
          </div>
          <div className="story-point">
            <Tooltip title="Completed story points" placement="top">
              <Chip label={project.CompletedStoryPoints} color="secondary" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListCard;
