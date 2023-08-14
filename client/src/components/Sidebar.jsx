import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

// navigation items for sidebar
// will iterate/map through each below:
const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",	// section heading, so
    icon: null,							// no icon
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",					// section heading, so
    icon: null,							// no icon
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",				// section heading, so
    icon: null,								// no icon
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,							// properties passed-in from <Layout>
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();	// grabs current path (can also extract search parameters in URL)
  const [active, setActive] = useState("");	// tracks page we're currently on
  const navigate = useNavigate();	// lets you navigate programmatically within your React code
  const theme = useTheme();	// MUI theme/colors

	// any time URL changes, set 'active' to current URL (used to determin page we're on)
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (	// only run when 'isSidebarOpen' is true
				// MUI <Drawer> component
				// https://mui.com/material-ui/react-drawer/
        <Drawer
          open={isSidebarOpen}	// always true
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"	// always visible	
          anchor="left"	// sidebar on left side
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {	// to determine class to use (<-- this one), needed to inspect page and find css class for this component
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",	// 0 for desktop; 2px for mobile
              width: drawerWidth,	// passed-in from <Layout>
            },
          }}
        >
          <Box width="100%">
						{/* clockwise = top right bottom left: */}
            <Box m="1.5rem 1rem 1rem 2rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ÜBERDASHBOARD
                  </Typography><br/>
                </Box>
                {!isNonMobile && (	// for *mobile screens*:
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
							<Box mt="0.5rem">
								{/* Typography? */}
								Coded by Craig Bucher
							</Box>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {		// grab text & icon from each item
                // if there's no icon (there should be):
								if (!icon) {
                  return (
										// React lists require a unique key:
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

								// when there *is* an icon (normal):
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);	// 'lcText' is also/actually the name of the route
                        setActive(lcText);	// set as active so we can change background color
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]	// when active
                            : "transparent",								// not active
                        color:
                          active === lcText
                            ? theme.palette.primary[600]	// when 'active'
                            : theme.palette.secondary[100],	// not active
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]	// if active
                              : theme.palette.secondary[200],	// not active
                        }}
                      >
                        {icon}
                      </ListItemIcon>
											{/* 'primary' = "the main content element" */}
                      <ListItemText primary={text} />
											{/* Add chevron when active: */}
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

					{/* I modified the margins for <Box> below */}
          <Box position="relative" m="1rem 0 0 0" bottom="2rem">
            <Divider />
            {/* Why include 'textTransform="none"' since it doesn't do anything??????? */}
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              {/* User image: */}
							<Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }} // crops image as necessary to fit
              />
							{/* User Info: */}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
							{/* Gear Icon: */}
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;