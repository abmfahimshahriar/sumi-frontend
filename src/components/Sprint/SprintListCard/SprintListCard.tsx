import { Menu, MenuItem, Tooltip, Chip } from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreateSprintDialog } from "../..";
import {
  IProjectMapStateToProps,
  Sprint,
} from "../../../interfaces/GlobalTypes";
import { MyButton } from "../../../utility/components";
import "./SprintListCard.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

// redux stuff
import { deleteSprint } from "../../../store/actions/sprintActions";
import { connect } from "react-redux";
type Props = {
  sprint: Sprint;
  deleteSprint: Function;
};
const SprintListCard: React.FC<Props> = ({ sprint, deleteSprint }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isUpdate, setIsUpdate] = useState(false);
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

  const handleDeleteSprint = () => {
    const payload = {
      ProjectId: sprint.ProjectId,
      SprintId: sprint._id,
    };
    deleteSprint(payload);
    closeMoreMenu();
  };
  return (
    <div className="single-sprint-list-card-wrapper">
      <div className="sprint-details-wrapper">
        <Link to={`/sprints/${sprint.ProjectId}/${sprint._id}`}>
          <div className="sprint-title">{sprint.SprintName}</div>
        </Link>
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
            <MenuItem onClick={handleOpenDialog}>Update</MenuItem>
            <MenuItem onClick={handleDeleteSprint}>Delete</MenuItem>
          </Menu>
          <CreateSprintDialog
            open={open}
            onClose={handleCloseDialog}
            isUpdate={isUpdate}
            selectedSprint={sprint}
          />
        </div>
      </div>

      <div className="sprint-details-wrapper">
        <div className="sprint-date-wrapper">
          <div className="sprint-date">
            <CalendarTodayIcon />{" "}
            {moment(sprint.StartDate).format("MM-DD-YYYY")}
          </div>
          <div className="date-divider">{"-"}</div>
          <div className="sprint-date">
            <CalendarTodayIcon /> {moment(sprint.EndDate).format("MM-DD-YYYY")}
          </div>
        </div>
        <div className="story-points-wrapper">
          <div className="story-point">
            <Tooltip title="Total story points" placement="top">
              <Chip label={sprint.TotalStoryPoints} color="primary" />
            </Tooltip>
          </div>
          <div className="story-point">
            <Tooltip title="Completed story points" placement="top">
              <Chip label={sprint.CompletedStoryPoints} color="secondary" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
  ui: state.ui,
});

const mapActionToProps = {
  deleteSprint,
};

export default connect(mapStateToProps, mapActionToProps)(SprintListCard);
