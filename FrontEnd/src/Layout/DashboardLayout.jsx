import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Header from "../Components/header";
import Sidebar from "../Components/sidebar";
import DashboardContent from "../pages/Dashboard/DashboardContent";
import Invoices from "../pages/Billing/BillingContent";
import TableContent from "../pages/Table/TableContent";
import ProfileComponent from "../pages/Profile/ProfileContent";
import NotificationComponent from "../pages/Notification/NotificationContent";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for Sidebar toggle

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "rgb(52, 71, 103)", // Main layout background
        minHeight: "100vh",
        height:'100%',
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen} // Pass the state to Sidebar
        toggleSidebar={toggleSidebar} // Pass toggle function to Sidebar
      />

      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          // minHeight: "auto",
          backgroundColor: "rgb(52, 71, 103)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "sticky", // Keep the header at the top
            top: 0,
            // backgroundColor: "rgb(52, 71, 103)", // Solid background color
            zIndex: 10,
            height: "64px", // Standard header height
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            marginLeft: { xs: 0, md: "250px" },
            borderRadius:'10px',
            // Optional shadow
          }}
        >
          <Header toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar to Header */}
        </Box>

        {/* Routes for the Content */}
        <Box 
          sx={{
            flexGrow: 1,
            // backgroundColor: "rgb(52, 71, 103)",
            color: "#FFF",
            // overflowY: "auto", // Scrollable content
            padding: 3,
            marginLeft: { xs: 0, md: "250px" },
            marginTop: { xs: 5, },
            // height:'auto',
        
          
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/billing" element={<Invoices />} />
            <Route path="/tables" element={<TableContent />} />
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/notifications" element={<NotificationComponent />} />
            {/* Add additional routes as needed */}
          </Routes>
        </Box>
      </Box>

      <CssBaseline />
    </Box>
  );
}

export default DashboardLayout;
