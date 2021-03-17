import React from "react";
import "./ProjectListCardSkeleton.css";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Chip from "@material-ui/core/Chip";

const ProjectListCardSkeleton = () => {
  return (
    <div className="single-project-skeleton-list-card-wrapper">
      <div className="project-skeleton-title" />
      <div className="project-skeleton-details-wrapper">
        <div className="project-skeleton-date-wrapper">
          <div className="project-skeleton-date">
            <CalendarTodayIcon /> <div className="project-skeleton-date-content" />
          </div>
          <div className="skeleton-date-divider">{"-"}</div>
          <div className="project-skeleton-date">
            <CalendarTodayIcon /> <div className="project-skeleton-date-content" />
          </div>
        </div>
        <div className="skeleton-story-points-wrapper">
          <div className="story-point">
            <Chip label="-" color="primary" />
          </div>
          <div className="skeleton-story-point">
            <Chip label="-" color="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListCardSkeleton;
