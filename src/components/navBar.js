import authService from "../services/authService";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    cursor: "pointer",
    textDecoration: "none",
  },
}));

const NavBar = ({ user }) => {
  const classes = useStyles();

  const logout = () => {
    authService.logout();
    window.location.href = "/";
  };

  return (
    <div>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Socio App
          </Typography>
          <nav>
            <NavLink className={classes.link} to="/posts">
              Posts
            </NavLink>
          </nav>
          {!user && (
            <nav>
              <NavLink className={classes.link} to="/login">
                Login
              </NavLink>
            </nav>
          )}
          {user && (
            <>
              <nav>
                <NavLink className={classes.link} to="/profile">
                  Saif
                </NavLink>
              </nav>
              <nav>
                <Link className={classes.link} onClick={logout}>
                  Logout
                </Link>
              </nav>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
