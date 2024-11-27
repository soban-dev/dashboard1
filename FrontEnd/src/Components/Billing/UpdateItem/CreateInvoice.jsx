import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";

const CreateInvoice = ({ onClose }) => {
  const [itemArray, setItemArray] = useState([]);

  return (
    <Box
      sx={{
        minHeight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: 1, md: 2 }, // Smaller padding for mobile/tablet
        position: "relative", // For positioning the close button
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose} // Trigger the onClose prop function to close
        sx={{
          position: "absolute",
          top: "15px", // Adjusted for responsiveness
          right: "15px", // Adjusted for smaller screens
          color: "#ff0000",
          zIndex: 10, // Ensure it's above all other elements
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          width: "100%", // Full width for mobile view
          maxWidth: { xs: "95%", md: 1200 }, // Adjust maxWidth for tablet/desktop
          p: { xs: 2, md: 4 }, // Dynamic padding for responsiveness
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
          overflowY: "auto", // Scroll for smaller screens
          maxHeight: { xs: "90vh", md: "auto" }, // Cap height for smaller screens
        }}
      >
        {/* Top Section */}
        <TopSection itemArray={itemArray} setItemArray={setItemArray} />

        {/* Bottom Section */}
        <BottomSection itemArray={itemArray} />
      </Box>
    </Box>
  );
};

export default CreateInvoice;