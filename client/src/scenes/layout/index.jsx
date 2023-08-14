import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
// <Outlet> is a special component in React that allows you to render children 
// into a specific location in the DOM
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");	// true when screen size is >= 600px
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId); // get 'userId' from redux global store; in this case, from /state/index.js 
  const { data } = useGetUserQuery(userId); // *actual api call* - destructure 'data' from response
  // console.log('data',data)

  return (
		// MUI <Box> allows passing styling properties in component definition
		// others require sue of 'sx:' element
    // 'flex' on desktop screen; 'block' on mobile:
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}	// user info or empty object
        isNonMobile={isNonMobile}	// for responsiveness
        drawerWidth="250px" // 250px when open
        isSidebarOpen={isSidebarOpen}	// state of sidebar open/closed
        setIsSidebarOpen={setIsSidebarOpen}	// function to open/close sidebar
      />
			{/* 'flexGrow' = how much of the remaining space in the flex container 
			should be assigned to the item (= width - 250px) */}
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
				{/* renders child element(s) based on <route>s in App.js: */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;