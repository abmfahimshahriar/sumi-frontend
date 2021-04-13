import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  IUserMapStateToProps,
  UserState,
} from "../../../interfaces/GlobalTypes";
import { MyButton } from "../../../utility/components";
import "./Notification.css";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { readNotification } from "../../../store/actions/userActions";

type Props = {
  user: UserState;
  readNotification: Function;
};
const Notification: React.FC<Props> = ({ user, readNotification }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const openNotificationMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReadNotification = (notificationId: string) => {
    readNotification(notificationId, pageNumber);
    closeNotificationMenu();
  }
  const closeNotificationMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div className="notification-wrapper">
      <MyButton tip="notifications" onClick={openNotificationMenu}>
        <NotificationsIcon></NotificationsIcon>
      </MyButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeNotificationMenu}
      >
        {user.notifications.map((item) => {
          return (
            <MenuItem
              key={item._id}
              onClick={() => handleReadNotification(item._id)}
              component={Link}
              to={`/sprints/${item.ProjectId}/${item.SprintId}/${item.TaskId}`}
            >
              {" "}
              {item.UnreadStatus && (
                <RadioButtonCheckedIcon style={{ marginRight: "8px" }} />
              )}{" "}
              {item.SenderName} {item.Action} {item.TaskName}
            </MenuItem>
          );
        })}
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
};

export default connect(mapStateToProps, mapActionToProps)(Notification);
