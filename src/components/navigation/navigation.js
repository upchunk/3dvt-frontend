import * as React from "react";
import "./navigation.css";
import { MainMenu, Rekonstruksi, Segmentasi, StaffOnly } from "./drawerData";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconContext } from "react-icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/horizontal-white.png";
import { Avatar, Grid } from "@mui/material";
import { IoChevronDown } from "react-icons/io5";
import Stack from "@mui/system/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LogOut } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/userConfig";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
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

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(true);
  const refresh_token = useSelector((state) => state.userConfig.refreshToken);
  const userData = useSelector((state) => state.userConfig.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const popup = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    LogOut(refresh_token).then((res) => {
      if (res.status === 205) {
        dispatch(setAuth(false));
      }
    });
  };

  const aboutPage = () => {
    setAnchorEl(null);
    navigate("/");
  };

  const toolbar = (
    <Toolbar>
      <Grid
        justify="space-between" // Add it here :)
        container
        spacing={24}
      >
        <Grid item>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, color: "#2A3042" }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>
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
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              <MenuItem onClick={aboutPage}>Tentang 3DVT</MenuItem>
            </Menu>
          </div>
        </Stack>
      </Grid>
    </Toolbar>
  );

  const drawer = (
    <>
      <DrawerHeader>
        <Link to={"/dashboard"}>
          <img src={logo} alt="3DVT" width="100"></img>
        </Link>
      </DrawerHeader>
      <Divider
        variant="string"
        textAlign="left"
        sx={{ pt: 2, color: "#a6b0cf" }}
      >
        Menu
      </Divider>
      <List>
        {MainMenu.map((item, index) => {
          return (
            <ListItem key={index} className={item.cName} disablePadding>
              <ListItemButton>
                <Link to={item.path}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      pl: 2,
                      pr: 2,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider
        variant="string"
        textAlign="left"
        sx={{ pt: 2, color: "#a6b0cf" }}
      >
        Segmentasi
      </Divider>
      <List>
        {Segmentasi.map((item, index) => {
          return (
            <ListItem key={index} className={item.cName} disablePadding>
              <ListItemButton>
                <Link to={item.path}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      pl: 2,
                      pr: 2,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider
        variant="string"
        textAlign="left"
        sx={{ pt: 2, color: "#a6b0cf" }}
      >
        Rekonstruksi
      </Divider>
      <List>
        {Rekonstruksi.map((item, index) => {
          return (
            <ListItem key={index} className={item.cName} disablePadding>
              <ListItemButton>
                <Link to={item.path}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      pl: 2,
                      pr: 2,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {userData.is_staff ? (
        <>
          <Divider
            variant="string"
            textAlign="left"
            sx={{ pt: 2, color: "#a6b0cf" }}
          >
            Staff Only
          </Divider>
          <List>
            {StaffOnly.map((item, index) => {
              return (
                <ListItem key={index} className={item.cName} disablePadding>
                  <ListItemButton>
                    <Link to={item.path}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          pl: 2,
                          pr: 2,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </Link>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </>
      ) : null}
    </>
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
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#2A3042",
              color: "white",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {drawer}
        </Drawer>
      </IconContext.Provider>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
