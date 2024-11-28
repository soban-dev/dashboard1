import React, { useState } from "react";
import { Box, Alert, IconButton, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NotificationComponent = () => {
  const [open, setOpen] = useState(true); // Initial state to show alerts

  const handleClose = () => {
    setOpen(false); // Close alert when close button is clicked
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "20px auto" }}>
      {/* Outer Box (for the entire notification section) */}
      <Paper
        elevation={12}
        sx={{
          backgroundColor: "#1A202C", // Dark background for the notification box
          borderRadius: "12px", // Rounded corners for the box
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px", // Increased gap between alerts
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)", // Added a soft shadow for depth
        }}
      >
        {/* Heading for Notification Section */}
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center", // Centered text for the heading
            marginBottom: "10px", // Space between heading and description
            fontFamily: "'Roboto', sans-serif", // Nice readable font
          }}
        >
          Alerts
        </Typography>

        {/* Description Text */}
        <Typography
          variant="body1"
          sx={{
            color: "#A0AEC0", // Light gray color for description
            textAlign: "center",
            fontFamily: "'Roboto', sans-serif", // Same font for description
            marginBottom: "20px", // Space between description and alerts
          }}
        >
          You will get all important messages or popups here.
        </Typography>

        {/* Red alert (primary) - Admin Login */}
        {open && (
          <Alert
            sx={{
              backgroundColor: "#F44336", // Updated red color for primary alert
              color: "white",
              position: "relative", // For positioning the close button
              padding: "15px 25px", // Increased padding for a more spacious feel
              borderRadius: "10px", // Slightly rounded corners for alert box
              fontWeight: "bold", // Bold text for more impact
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)", // Added a slight shadow for alert
              transition: "all 0.3s ease-in-out", // Smooth transition for hover effect
              "&:hover": {
                transform: "scale(1.02)", // Slightly scale up the alert on hover
              },
            }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "8px", // Position close button at the top-right
                  right: "8px",
                  color: "white",
                  "&:hover": {
                    color: "#F44336", // Color change on hover for better visibility
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            Howard Kingston Admin has logged in now.
          </Alert>
        )}

        {/* Blue alert (info) - Employee Login */}
        {open && (
          <Alert
            sx={{
              backgroundColor: "#1E88E5", // Updated blue color for info alert
              color: "white",
              position: "relative", // For positioning the close button
              padding: "15px 25px", // Increased padding for a more spacious feel
              borderRadius: "10px", // Slightly rounded corners for alert box
              fontWeight: "bold", // Bold text for more impact
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)", // Added a slight shadow for alert
              transition: "all 0.3s ease-in-out", // Smooth transition for hover effect
              "&:hover": {
                transform: "scale(1.02)", // Slightly scale up the alert on hover
              },
            }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "8px", // Position close button at the top-right
                  right: "8px",
                  color: "white",
                  "&:hover": {
                    color: "#1E88E5", // Color change on hover for better visibility
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            Jesa Maria Employee has logged in now.
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default NotificationComponent;
