import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LanguageIcon from "@mui/icons-material/Language";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* Permanent Sidebar for md and above */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" }, // Hide for smaller screens
          "& .MuiDrawer-paper": {
            width: "250px", // Explicit fixed width
            maxWidth: "100%", // Prevent overflow
            backgroundColor: "#1F2937", // Sidebar background color
            color: "#EDEDED",
            boxSizing: "border-box", // Include padding and border in width
            overflow: "hidden", // Prevent scrollbars
            padding:'19px',
            // Margin:'10px',
            borderRadius:'15px',
            margin:'6px',
          },
        }}
      >
        <SidebarContent location={location} toggleSidebar={toggleSidebar} />
      </Drawer>

      {/* Temporary Sidebar for xs and sm */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={toggleSidebar} // Close on backdrop click or menu selection
        sx={{
          display: { xs: "block", md: "none" }, // Show only for small screens
          "& .MuiDrawer-paper": {
            width: "250px", // Explicit fixed width
            maxWidth: "100%", // Prevent overflow
            backgroundColor: "#1F2937", // Sidebar background color
            color: "#EDEDED",
            boxSizing: "border-box", // Include padding and border in width
            overflow: "hidden", // Prevent scrollbars
          },
        }}
      >
        <SidebarContent location={location} toggleSidebar={toggleSidebar} />
      </Drawer>
    </>
  );
}

function SidebarContent({ location, toggleSidebar }) {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Tables", icon: <TableChartIcon />, path: "/tables" },
    { text: "Billing", icon: <ReceiptIcon />, path: "/billing" },
    // { text: "RTL", icon: <LanguageIcon />, path: "/rtl" },
    { text: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
    { text: "Sign In", icon: <LoginIcon />, path: "/sign-in" },
    { text: "Sign Up", icon: <AppRegistrationIcon />, path: "/sign-up" },
  ];

  return (
    <Box
      sx={{
        height: "100%", // Fill the entire height of the sidebar
        display: "flex",
        flexDirection: "column", // Stack items vertically
      }}
    >
      {/* Logo Section */}
      <Typography
        variant="h6"
        sx={{
          padding: 2,
          color: "#FFF",
          textAlign: "center",
        }}
      >
        <DashboardIcon sx={{ fontSize: 32 }} /> Management
      </Typography>

      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={toggleSidebar} // Close sidebar after selecting a menu item
            sx={{
              color: location.pathname === item.path ? "#FFF" : "#A9A9A9",
              backgroundColor:
                location.pathname === item.path ? "rgba(30, 144, 255, 0.9)" : "transparent",
              borderRadius: 2,
              margin: 1,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "#FFF" : "#A9A9A9",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
