import React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Container, Box, Icon, List, Typography, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { GiF1Car } from "react-icons/gi";
import { FaFlagCheckered } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { GiRoad } from "react-icons/gi";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#2b2d42",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  backgroundColor: "#2b2d42",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const sideBarIcons = [FaFlagCheckered, GiF1Car, BsCardChecklist, GiRoad, AiOutlineLineChart];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position='fixed' open={open} sx={{ backgroundColor: "#2b2d42" }}>
        <Toolbar>
          <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' sx={{ marginRight: 5, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' width='100%'>
            Dashboards {">"} Races
          </Typography>
          <Container sx={{ display: "flex", color: "White", justifyContent: "flex-end" }}>Ricky Bobby</Container>
          <IconButton className='avatar-button' sx={{ display: "flex", alignContent: "flex-end" }}>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer className='sidebar' variant='permanent' open={open} sx={{ backgroundColor: "white" }}>
        <DrawerHeader>
          <Box className='site-title' sx={{ fontSize: "18px", fontWeight: "700", color: "white", justifyContent: "center" }}>
            iRacing Season Lineup
          </Box>
          <IconButton className='menu-close-button' onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ color: "white" }} />
          </IconButton>
        </DrawerHeader>
        <List className='sidebar-list'>
          {["Races", "Cars", "Series", "Tracks", "Results"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block", fontSize: "15px" }}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                <ListItemIcon className='sidebar-icon' sx={{ color: "white", minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                  <Icon as={sideBarIcons[index]} />
                </ListItemIcon>
                <ListItemText className='sidebar-text' primary={text} sx={{ opacity: open ? 1 : 0, color: "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}