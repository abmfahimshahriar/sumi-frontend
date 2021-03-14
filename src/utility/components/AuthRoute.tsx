import React from "react";
import { Route, Redirect } from "react-router-dom";
// redux stuff
import { IUserMapStateToProps, UserState } from "../../interfaces/GlobalTypes";
import { connect } from "react-redux";

type Props = {
  user?: UserState;
  path: any;
  exact: any;
  children: any;
};
const AuthRoute: React.FC<Props> = ({ children, user, path, exact }) => {
  return (
    <Route
      exact
      path={path}
      render={() => {
        return user?.isAuthenticated ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};

const mapStateToProps = (state: IUserMapStateToProps) => ({
  user: state.user,
});

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(AuthRoute);
