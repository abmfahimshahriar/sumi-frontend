import React, { useState } from "react";
import {
  IProjectMapStateToProps,
  Project,
} from "../../../interfaces/GlobalTypes";
import "./ProjectListCard.css";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import { MyButton } from "../../../utility/components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { CreateProjectDialog } from "../../../components";
import { connect } from "react-redux";
import { deleteProject } from "../../../store/actions/projectAction";
type Props = {
  project: Project;
  deleteProject: Function;
  isInvolvedProjectProp?: boolean;
};
const ProjectListCard: React.FC<Props> = ({
  project,
  deleteProject,
  isInvolvedProjectProp,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isInvolvedProject, setIsInvolvedProject] = useState(
    isInvolvedProjectProp ? true : false
  );
  const openMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMoreMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setIsUpdate(true);
    setOpen(true);
    closeMoreMenu();
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setIsUpdate(false);
  };

  const handleDeleteProject = () => {
    deleteProject(project._id);
    closeMoreMenu();
  };
  return (
    <div className="single-project-list-card-wrapper">
      <div className="project-details-wrapper">
        <div className="project-title">{project.ProjectName}</div>
        <div>
          {!isInvolvedProject && (
            <MyButton tip="more" onClick={openMoreMenu}>
              <MoreVertIcon />
            </MyButton>
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMoreMenu}
          >
            <MenuItem onClick={handleOpenDialog}>Update</MenuItem>
            <MenuItem onClick={handleDeleteProject}>Delete</MenuItem>
          </Menu>
          <CreateProjectDialog
            open={open}
            onClose={handleCloseDialog}
            isUpdate={isUpdate}
            selectedProject={project}
          />
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

const mapStateToProps = (state: IProjectMapStateToProps) => ({});

const mapActionToProps = {
  deleteProject,
};

export default connect(mapStateToProps, mapActionToProps)(ProjectListCard);
