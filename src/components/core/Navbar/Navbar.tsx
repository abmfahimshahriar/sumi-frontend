import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyButton } from "../../../utility/components";
import jwtDecode from "jwt-decode";
// MUI stuffs
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const openProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeProfileMenu = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    logoutUser();
    window.location.href = "/login";
    closeProfileMenu();
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

          {!user.isAuthenticated && (
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}

          {user.isAuthenticated && (
            <Fragment>
              <MyButton tip="profile" onClick={openProfileMenu}>
                <Avatar>{user.username?.slice(0,1)}</Avatar>
              </MyButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeProfileMenu}
              >
                <MenuItem onClick={closeProfileMenu}>Profile</MenuItem>
                <MenuItem
                  onClick={closeProfileMenu}
                  component={Link}
                  to="/projects"
                >
                  Projects
                </MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </Fragment>
          )}
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
