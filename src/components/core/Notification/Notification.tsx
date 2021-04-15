/* eslint-disable @typescript-eslint/no-unused-vars */
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  IUserMapStateToProps,
  UIState,
  UserState,
} from "../../../interfaces/GlobalTypes";
import { MyButton } from "../../../utility/components";
import "./Notification.css";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import {
  readNotification,
  getUserNotifications,
} from "../../../store/actions/userActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Badge from "@material-ui/core/Badge";

type Props = {
  user: UserState;
  readNotification: Function;
  getUserNotifications: Function;
  ui: UIState;
};
const Notification: React.FC<Props> = ({
  user,
  readNotification,
  getUserNotifications,
  ui,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const openNotificationMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReadNotification = (notificationId: string) => {
    readNotification(notificationId, pageNumber);
    closeNotificationMenu();
  };
  const closeNotificationMenu = () => {
    setAnchorEl(null);
  };

  const loadMoreNotifications = () => {
    getUserNotifications(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };
  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log("end reached");
    }
  };
  return (
    <div className="notification-wrapper">
      <MyButton tip="notifications" onClick={openNotificationMenu}>
        <Badge badgeContent={user.unreadNotifications} color="secondary">
          <NotificationsIcon />
        </Badge>
      </MyButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeNotificationMenu}
      >
        <div className="notification-menu">
          {user.notifications.map((item) => {
            return (
              <MenuItem
                key={item._id}
                onClick={() => handleReadNotification(item._id)}
                component={Link}
                to={`/sprints/${item.ProjectId}/${item.SprintId}/${item.TaskId}`}
              >
                <div className="notification-item">
                  {" "}
                  {item.UnreadStatus && (
                    <RadioButtonCheckedIcon style={{ marginRight: "8px" }} />
                  )}{" "}
                  {item.SenderName} {item.Action} {item.TaskName}
                </div>
              </MenuItem>
            );
          })}
          <div className="load-more-notification-btn">
            <Button
              variant="contained"
              color="primary"
              onClick={loadMoreNotifications}
              disabled={ui.notificationLoading}
            >
              Load more
              {ui.notificationLoading && (
                <CircularProgress size={30} className="notification-loader" />
              )}
            </Button>
          </div>
        </div>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state: IUserMapStateToProps) => ({
  user: state.user,
  ui: state.ui,
});

const mapActionToProps = {
  readNotification,
  getUserNotifications,
};

export default connect(mapStateToProps, mapActionToProps)(Notification);
