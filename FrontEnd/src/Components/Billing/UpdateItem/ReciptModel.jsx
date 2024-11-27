import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";

const ReceiptModal = ({
  open,
  onClose,
  inventory = [],
  createdBy,
  setCreatedBy,
  clientName,
  setClientName,
}) => {
  const [message, setMessage] = useState(""); // To store error or success messages

  const calculateTotalAmount = () => {
    return Math.round(inventory.reduce((total, row) => total + row.price, 0)); // Round the total amount
  };

  const handleGenerateReceipt = async () => {
    if (!createdBy || !clientName) {
      setMessage("Please fill in both 'Created By' and 'Client Name' fields.");
      return;
    }

    const data = {
      oldinvoice_id, //id number of old invoice.
      createdBy,
      customername: clientName,
      items: inventory,
      total: calculateTotalAmount(), // Send total as an integer
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/updatereceipt",
        data
      );

      console.log("Backend Response:", response.data); // Log backend response
      setMessage("Receipt generated successfully!");
    } catch (error) {
      console.error("Error generating receipt:", error);
      setMessage("Failed to generate receipt. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="receipt-modal-title"
      aria-describedby="receipt-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 500,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" id="receipt-modal-title" mb={2}>
          Generate Receipt
        </Typography>
        <TextField
          fullWidth
          label="Created By"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Customer Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Receipt Table */}
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            mb: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total Qty</TableCell>
                <TableCell align="right">Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory?.length > 0 ? (
                inventory.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">${row.price_per_unit}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
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

        {/* Total Amount */}
        <Typography variant="h6" align="right" sx={{ mb: 2 }}>
          Total: ${calculateTotalAmount()}
        </Typography>

        {/* Error/Success Message */}
        {message && (
          <Typography
            variant="body2"
            color={message.includes("successfully") ? "green" : "red"}
            sx={{ mb: 2, textAlign: "left" }}
          >
            {message}
          </Typography>
        )}

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleGenerateReceipt}>
            Confirm
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ReceiptModal;
