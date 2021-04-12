import React, { useEffect, useState } from "react";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authenticated, setAuthenticated] = useState(user?.isAuthenticated);
  const token = localStorage.Token;
  useEffect(() => {
    setAuthenticated(user?.isAuthenticated);
  }, [user]);

  return (
    <Route
      exact
      path={path}
      render={() => {
        return token ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};

const mapStateToProps = (state: IUserMapStateToProps) => ({
  user: state.user,
  ui: state.ui,
});

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(AuthRoute);
