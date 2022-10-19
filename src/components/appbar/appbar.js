import * as React from "react";
import "./appbar.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { IconContext } from "react-icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, Button, Grid } from "@mui/material";
import { IoChevronDown, IoSettingsOutline } from "react-icons/io5";
import Stack from "@mui/system/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LogOut } from "../../utils/api";
import logo from "../../assets/horizontal-crop.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuth,
  setJwtToken,
  setLoading,
  setUserData,
} from "../../redux/userConfig";

const drawerWidth = 0;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: -40,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

export default function TopAppBar() {
  const open = false;
  const isAuthenticated = useSelector(
    (state) => state.userConfig.isAuthenticated
  );
  const refresh_token = useSelector((state) => state.userConfig.refreshToken);
  const userData = useSelector((state) => state.userConfig.userData);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const popup = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    LogOut(refresh_token).then((res) => {
      if (res.status === 205) {
        dispatch(setAuth(false));
        dispatch(setJwtToken(""));
        dispatch(setUserData({}));
        dispatch(setLoading(true));
      }
    });
  };

  const toolbar = (
    <Toolbar>
      <Grid
        justify="space-between" // Add it here :)
        container
        spacing={24}
        paddingY={1}
        paddingX={2}
      >
        <Grid item>
          <Link to="/dashboard">
            <img className="appIcon" src={logo}></img>
          </Link>
        </Grid>
      </Grid>
      <Grid item>
        {isAuthenticated ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link to={`/user`}>
              <Avatar
                alt="Avatar"
                className="avatar"
                src={userData?.avatar}
                sx={{ width: 40, height: 40 }}
              />
            </Link>
            <p className="username">{String(userData?.username)}</p>
            <div>
              <IconButton
                aria-label="account"
                aria-controls={popup ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={popup ? "true" : undefined}
                onClick={handleClick}
                size="small"
                edge="end"
                color="inherit"
              >
                <IoChevronDown />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={popup}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "IconButton",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </div>
            <Link to={"/pengaturan"}>
              <IconButton
                aria-label="settings"
                size="small"
                edge="end"
                color="inherit"
              >
                <IoSettingsOutline />
              </IconButton>
            </Link>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="contained"
              onClick={() => navigate("../masuk")}
              sx={{
                width: "90%",
                backgroundColor: "#0148A9",
                paddingX: 3,
                align: "center",
              }}
            >
              Masuk
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("../daftar")}
              sx={{
                width: "90%",
                backgroundColor: "#0148A9",
                paddingX: 3,
                align: "center",
              }}
            >
              daftar
            </Button>
          </Stack>
        )}
      </Grid>
    </Toolbar>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <IconContext.Provider
        value={{
          className: "iconContext",
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "#FFFFFF" }}
        >
          {toolbar}
        </AppBar>
      </IconContext.Provider>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
