import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// MUI stuffs
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// redux stuff
import { connect } from "react-redux";
import {
  logoutUser,
  setAuthenticated,
} from "../../../store/actions/userActions";
import {
  IUserMapStateToProps,
  UserState,
} from "../../../interfaces/GlobalTypes";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

type Props = {
  logoutUser: Function;
  setAuthenticated: Function;
  user: UserState;
};

const Navbar: React.FC<Props> = ({ user, logoutUser, setAuthenticated }) => {
  const classes = useStyles();

  useEffect(() => {
    userAuthenticationCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userAuthenticationCheck = () => {
    const token = localStorage.Token;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logoutUser();
        window.location.href = "/login";
      } else {
        setAuthenticated();
      }
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Sumi
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/projects"
          >
            projects
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state: IUserMapStateToProps) => ({
  user: state.user,
});

const mapActionToProps = {
  logoutUser,
  setAuthenticated,
};

export default connect(mapStateToProps, mapActionToProps)(Navbar);
