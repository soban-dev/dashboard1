import React, { useState, useRef } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import backgroundImage from "../../../assets/background.jpg";
import axios from "axios"; // Import axios

const CreateProduct = () => {
  const [clientName, setClientName] = useState(""); // State for client name
  const [price, setPrice] = useState(""); // State for price
  const [quantity, setQuantity] = useState(""); // State for available quantity
  const [productData, setProductData] = useState([]); // Array to store product data

  // Create refs for the inputs
  const priceInput = useRef(null);
  const quantityInput = useRef(null);

  const handleKeyPress = (e, nextField) => {
    if (e.key === "Enter") {
      nextField.current.focus();
    }
  };

  const handleSubmit = async () => {
    // Create a product object to send
    const newProduct = {
      name: clientName,
      price: price,
      quantity: quantity,
    };

    // Add the new product to the array
    setProductData((prevData) => [...prevData, newProduct]);

    try {
      // Send the data to the backend
      const response = await axios.post("YOUR_BACKEND_API_URL", newProduct);

      // Log the response from the backend
      console.log("Backend Response:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <Box
  sx={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "60%", // Ensure width is set to center correctly
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Vertically center
    alignItems: "center", // Horizontally center
    padding: 3,
    margin: "auto", // Automatically centers horizontally
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    border:'2px solid #444',
  }}
>
      <Typography variant="h4" textAlign="center" sx={{
    mb: 3,
    color: "white",
    fontFamily: "Poppins, sans-serif", // Apply custom font
    fontWeight: 600, // Adjust font weight if needed
  }}>
        Add a New Product
      </Typography>

      {/* Client Name Input */}
      <Box sx={{ mb: 3, width: "100%", maxWidth: "350px" }}>
        <TextField
          variant="outlined"
          placeholder="Enter Name"
          fullWidth
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          InputProps={{
            style: {
              color: "white",
              background: "#424242",
            },
          }}
          onKeyDown={(e) => handleKeyPress(e, priceInput)} // Move to price field on Enter
        />
      </Box>

      {/* Price Input */}
      <Box sx={{ mb: 3, width: "100%", maxWidth: "350px" }}>
        <TextField
          variant="outlined"
          placeholder="Enter Price"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          InputProps={{
            style: {
              color: "white",
              background: "#424242",
            },
          }}
          onKeyDown={(e) => handleKeyPress(e, quantityInput)} // Move to quantity field on Enter
          inputRef={priceInput} // Reference for price field
        />
      </Box>

      {/* Quantity Input */}
      <Box sx={{ mb: 3, width: "100%", maxWidth: "350px" }}>
        <TextField
          variant="outlined"
          placeholder="Enter Available Quantity"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputProps={{
            style: {
              color: "white",
              background: "#424242",
            },
          }}
          onKeyDown={(e) => handleKeyPress(e, null)} // No next field after quantity
          inputRef={quantityInput} // Reference for quantity field
        />
      </Box>

      {/* Add Product Button */}
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',  
        width:'70%',
        paddingTop:'20px',
      }}>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
        //   position: "absolute",
        //   bottom: "80px",
        //   right: "260px",
          backgroundColor: "#1976d2",
          ":hover": {
            backgroundColor: "#1565c0",
          },
          fontSize: "16px",
          padding: "10px 20px",
        }}
      >
        Add Product
      </Button>
      </Box>
    </Box>
  );
};

export default CreateProduct;
