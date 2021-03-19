import React, { useState } from "react";
import { Project } from "../../../interfaces/GlobalTypes";
import "./ProjectListCard.css";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import { MyButton } from "../../../utility/components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

type Props = {
  project: Project;
};
const ProjectListCard: React.FC<Props> = ({ project }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMoreMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div className="single-project-list-card-wrapper">
      <div className="project-details-wrapper">
        <div className="project-title">{project.ProjectName}</div>
        <div>
          <MyButton tip="more" onClick={openMoreMenu}>
            <MoreVertIcon />
          </MyButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMoreMenu}
          >
            <MenuItem onClick={closeMoreMenu}>Update</MenuItem>
            <MenuItem onClick={closeMoreMenu} component={Link} to="/projects">
              something with link
            </MenuItem>
            <MenuItem onClick={closeMoreMenu}>Delete</MenuItem>
          </Menu>
        </div>
      </div>

      <div className="project-details-wrapper">
        <div className="project-date-wrapper">
          <div className="project-date">
            <CalendarTodayIcon />{" "}
            {moment(project.StartDate).format("MM-DD-YYYY")}
          </div>
          <div className="date-divider">{"-"}</div>
          <div className="project-date">
            <CalendarTodayIcon /> {moment(project.EndDate).format("MM-DD-YYYY")}
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
