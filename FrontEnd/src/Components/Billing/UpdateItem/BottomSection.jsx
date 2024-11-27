import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import ReceiptModal from "./ReciptModel"; // Import the modal component

const BottomSection = ({ itemArray = [] }) => {
  const [inventory, setInventory] = useState([]); // Table inventory state
  const [openModal, setOpenModal] = useState(false); // Modal open state
  const [createdBy, setCreatedBy] = useState(""); // Created By input state
  const [clientName, setClientName] = useState(""); // Client Name input state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  useEffect(() => {
    console.log("itemArray on render or update:", itemArray);
  }, [itemArray]);

  const handleAddToCart = () => {
    // Filter valid items before adding to the inventory
    const validItems = itemArray.filter(
      (item) =>
        item.name && // Check if the item has a name
        item.price_per_unit > 0 && // Check if the price per unit is greater than 0
        item.quantity > 0 // Check if the total quantity is greater than 0
    );

    if (validItems.length > 0) {
      setInventory(validItems); // Add only valid items to the inventory
      setErrorMessage(""); // Clear error message if successful
    } else {
      setErrorMessage("Please ensure all items have a valid name, price, and quantity."); // Set error message
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          height: "300px",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#1e88e5", // Updated solid blue color
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "18px", // Slightly larger font size for better readability
                  fontFamily: "'Roboto', sans-serif", // Modern and clean font
                  letterSpacing: "0.5px", // Improved letter spacing
                }}
              >
                Item
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "18px",
                  fontFamily: "'Roboto', sans-serif",
                  letterSpacing: "0.5px",
                }}
                align="right"
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "18px",
                  fontFamily: "'Roboto', sans-serif",
                  letterSpacing: "0.5px",
                }}
                align="right"
              >
                Total Qty
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "18px",
                  fontFamily: "'Roboto', sans-serif",
                  letterSpacing: "0.5px",
                }}
                align="right"
              >
                Total Amount
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {inventory?.length > 0 ? (
              inventory.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">${row.price_per_unit || 0}</TableCell>
                  <TableCell align="right">{row.quantity || 0}</TableCell>
                  <TableCell align="right">${row.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No items available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Buttons and Error Message */}
      <Stack direction="row" spacing={2} mt={2} justifyContent="space-between" alignItems="center">
        {/* Left-aligned: Add to Cart and Error Message */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="contained"
            sx={{
              height: "50px",
              borderRadius: "25px",
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: "#1e88e5", // Brighter blue
              textTransform: "none",
              fontSize: "16px", // Improved font size
              "&:hover": {
                backgroundColor: "#1565c0", // Slightly darker blue on hover
              },
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          {errorMessage && (
            <Typography
              variant="body2"
              sx={{
                color: "red", // Red text for error
                fontSize: "14px", // Smaller font for error message
              }}
            >
              {errorMessage}
            </Typography>
          )}
        </Stack>

        {/* Right-aligned: Generate Receipt Button */}
        <Button
          variant="contained"
          sx={{
            height: "50px",
            borderRadius: "25px",
            color: "#fff",
            fontWeight: "bold",
            backgroundColor: "#1e88e5", // Brighter blue
            textTransform: "none",
            fontSize: "16px", // Improved font size
            "&:hover": {
              backgroundColor: "#1565c0", // Slightly darker blue on hover
            },
          }}
          onClick={handleOpenModal}
        >
          Generate Receipt
        </Button>
      </Stack>

      {/* Receipt Modal */}
      <ReceiptModal
        open={openModal}
        onClose={handleCloseModal}
        inventory={inventory}
        createdBy={createdBy}
        setCreatedBy={setCreatedBy}
        clientName={clientName}
        setClientName={setClientName}
      />
    </Box>
  );
};

export default BottomSection;
