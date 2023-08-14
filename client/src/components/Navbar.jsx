import { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  // Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import ViewSidebarIconTwoTone from '@mui/icons-material/ViewSidebar';
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";	// just a placeholder
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
	// useDispatch = allows you to send or dispatch an action to the redux 
	// store by giving the action as an argument to the dispatch variable
  const dispatch = useDispatch();	// invoke useDispatch
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null); // identifies selected menu item
  const isOpen = Boolean(anchorEl);   // menu 'isOpen' when 'anchorEl' has a value
  const handleClick = (event) => setAnchorEl(event.currentTarget);  // set 'anchorEl' to item user clicks on
  const handleClose = () => setAnchorEl(null);  // when close menu, remove anchor element

  return (
		// <AppBar> displays information and actions relating to the current screen
    <AppBar
      sx={{
        position: "static",	// so doesn't move
        background: "none",	// by default, it has a background
        boxShadow: "none",
      }}
    >
			{/* The main purpose of Toolbar is to display its children with an 
			// inline display (elements are placed next to each other), something 
			Appbar doesn't do */}
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <ViewSidebarIconTwoTone sx={{
              transform: "rotate(180deg)",
              }} />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"	// gap of 3rem between all child components
            p="0.1rem 1.5rem"	// 0.1 top/bottom; 1.5 left/right
          >
            <InputBase placeholder="Search..." />
            <IconButton>
							{/* MUI 'search' icon: */}
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
					{/* switch between light and dark modes: */}
					{/* 'dispatch' = redux */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl} // all defined above:
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              {/* only one menu item, simulating logout function: */}
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
              <MenuItem onClick={handleClose}>About</MenuItem>
              <MenuItem onClick={handleClose}>Sample Item</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;