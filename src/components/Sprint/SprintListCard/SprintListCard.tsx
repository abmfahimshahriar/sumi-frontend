import { Menu, MenuItem, Tooltip, Chip } from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreateSprintDialog } from "../..";
import { Sprint } from "../../../interfaces/GlobalTypes";
import { MyButton } from "../../../utility/components";
import "./SprintListCard.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

type Props = {
  sprint: Sprint;
};
const SprintListCard: React.FC<Props> = ({ sprint }) => {
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
    closeMoreMenu();
  };
  return (
    <div className="single-sprint-list-card-wrapper">
      <div className="sprint-details-wrapper">
        <Link to={`/sprints/${sprint._id}`}>
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

export default SprintListCard;
