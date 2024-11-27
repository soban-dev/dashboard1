import React, { useState } from "react";
import { Box, Stack, TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";

const TopSection = ({ setItemArray }) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemValue, setItemValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [oldInvoiceId, setOldInvoiceId] = useState(""); // State for Old Invoice#ID

  const fetchSuggestions = async (query) => {
    try {
      if (query.length === 0) {
        setSuggestions([]);
      } else if (query.length > 1) {
        const response = await axios.post("http://localhost:3000/api/auth/searchitem", {
          name: query,
        });
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    fetchSuggestions(event.target.value);
  };

  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/fetchitem", {
        name: suggestion.name,
      });
      setSelectedItem(response.data);
      setSearchValue(suggestion.name);
      setItemValue("");
      setSuggestions([]);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (event.key === "Escape") {
      setSuggestions([]);
    }
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      updateItemArray();
    }
  };

  const handleItemInputChange = (event) => {
    setItemValue(event.target.value);
  };

  const handleItemInputKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      updateItemArray();
    }
  };

  const updateItemArray = () => {
    const newItem = {
      name: searchValue,
      quantity: itemValue || 0,
      price_per_unit: selectedItem?.selling_price_per_unit || 0,
      price: itemValue * selectedItem?.selling_price_per_unit,
    };

    setItemArray((prevArray) => {
      const existingIndex = prevArray.findIndex((item) => item.name === searchValue);
      if (existingIndex > -1) {
        const updatedArray = [...prevArray];
        updatedArray[existingIndex] = newItem;
        return updatedArray;
      }
      return [...prevArray, newItem];
    });
  };

  const handleOldInvoiceKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(`Old Invoice ID Entered: ${oldInvoiceId}`);
    }
  };

  return (
    <Box>
      {/* Top text field for Old Invoice ID */}
      <TextField
        label="Old Invoice#ID"
        variant="standard"
        value={oldInvoiceId}
        onChange={(e) => setOldInvoiceId(e.target.value)}
        onKeyDown={handleOldInvoiceKeyDown}
        fullWidth
        sx={{
          marginBottom: 2,
          maxWidth: { xs: "100%", sm: "80px" }, // Responsive width
        }}
      />

      <Typography
        variant="h4"
        textAlign="center"
        mb={3}
        sx={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bold",
          fontSize: "28px",
          letterSpacing: "1px",
          color: "#1e88e5",
        }}
      >
        Create Invoice
      </Typography>

      <Stack direction="column" spacing={2} mb={2} alignItems="stretch">
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiInputBase-root": {
                height: "50px",
              },
            }}
          />
          {suggestions.length > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#fff",
                zIndex: 10,
                borderRadius: 1,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    backgroundColor: index === highlightedIndex ? "#f0f0f0" : "transparent",
                  }}
                >
                  {suggestion.name}
                </MenuItem>
              ))}
            </Box>
          )}
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="flex-end">
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                height: "55px",
                width: "130px",
                fontSize: "14px",
                background: "linear-gradient(90deg, #1E90FF, #007BFF)",
                color: "#FFF",
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
                "&:hover": {
                  background: "linear-gradient(90deg, #007BFF, #0056B3)",
                },
              }}
              onClick={toggleEditing}
            >
              Total Quantity
            </Button>
            <Box
              sx={{
                mt: 1,
                display: isEditing ? "block" : "none",
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter value"
                value={itemValue}
                onChange={handleItemInputChange}
                onKeyDown={handleItemInputKeyDown}
                onBlur={() => setIsEditing(false)}
                autoFocus
                sx={{
                  width: { xs: "100%", sm: "130px" },
                }}
              />
            </Box>
            {!isEditing && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                {itemValue || "Enter a value"}
              </Typography>
            )}
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                height: "55px",
                width: "130px",
                fontSize: "14px",
                background: "linear-gradient(90deg, #1E90FF, #007BFF)",
                color: "#FFF",
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
                "&:hover": {
                  background: "linear-gradient(90deg, #007BFF, #0056B3)",
                },
              }}
            >
              PRICE
            </Button>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontFamily: "Roboto, sans-serif",
              }}
            >
              ${selectedItem?.selling_price_per_unit || 0}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                height: "55px",
                width: "130px",
                fontSize: "14px",
                background: "linear-gradient(90deg, #1E90FF, #007BFF)",
                color: "#FFF",
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
                "&:hover": {
                  background: "linear-gradient(90deg, #007BFF, #0056B3)",
                },
              }}
            >
              AVAILABLE QTY
            </Button>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {selectedItem?.quantity || 0}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopSection;
