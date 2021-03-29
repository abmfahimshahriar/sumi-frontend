import React from "react";
import "./UserList.css";

// mui stuff
import CheckIcon from "@material-ui/icons/Check";

// redux stuff
import { connect } from "react-redux";
import {
  ProjectState,
  UIState,
  IProjectMapStateToProps,
} from "../../../interfaces/GlobalTypes";
import { selectUser, selectUserFromTask } from "../../../store/actions/projectAction";

type Props = {
  project: ProjectState;
  ui: UIState;
  selectUser: Function;
  selectUserFromTask: Function;
  fromTask?: boolean;
};

const UserList: React.FC<Props> = ({ project, selectUser, fromTask, selectUserFromTask }) => {
  const handleUserSelect = (userId: string) => {
    if (!fromTask) selectUser(userId);
    else selectUserFromTask(userId);
  };

  const userListMarkup = project.usersList.map((item) => (
    <div
      key={item._id}
      className="user-list-item"
      onClick={() => handleUserSelect(item._id)}
    >
      <div>
        {item.Name}({item.Email})
      </div>
      <div>{item.IsSelected && <CheckIcon />}</div>
    </div>
  ));
  const noUsersMarkup = (
    <div>
      There are currently no users on the list. Please type user name or email
      to add.
    </div>
  );
  return (
    <div>{project.usersList.length > 0 ? userListMarkup : noUsersMarkup}</div>
  );
};

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
  ui: state.ui,
});

const mapActionToProps = {
  selectUser,
  selectUserFromTask,
};

export default connect(mapStateToProps, mapActionToProps)(UserList);
