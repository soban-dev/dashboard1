import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useTheme } from "@mui/material/styles";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "100%",
  overflowX: "auto",
  backgroundColor: "#1f1f1f", // Darker background color
  boxShadow: "0 4px 10px rgba(145, 157, 224, 0.3)",
  borderRadius: "8px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#2c2c2c", // Darker row background
  "&:hover": {
    backgroundColor: "#3a3a3a", // Slight hover effect
  },
}));

const StyledTableHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#444444", // Darker header background
}));

const ProgressBar = styled(Box)(({ progress }) => ({
  position: "relative",
  width: "100%",
  height: "8px",
  backgroundColor: "#333",
  borderRadius: "4px",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: `${progress}%`,
    height: "100%",
    backgroundColor:
      progress === 100 ? "#4caf50" : progress > 50 ? "#2196f3" : "#f44336",
    borderRadius: "4px",
  },
}));

const TableContent = () => {
  const theme = useTheme();

  // Sales data
  const rows = [
    { product: "Smartphone", revenue: "$12,500", status: "Completed", progress: 100 },
    { product: "Laptop", revenue: "$8,000", status: "In Progress", progress: 60 },
    { product: "Headphones", revenue: "$3,400", status: "Canceled", progress: 20 },
    { product: "Smartwatch", revenue: "$6,000", status: "Completed", progress: 100 },
    { product: "Camera", revenue: "$4,500", status: "In Progress", progress: 75 },
    { product: "Gaming Console", revenue: "$10,000", status: "Pending", progress: 50 },
  ];

  // Icons for each product category with white color
  const icons = {
    Smartphone: <ShoppingCartIcon sx={{ color: "white" }} />,
    Laptop: <MonetizationOnIcon sx={{ color: "white" }} />,
    Headphones: <StorefrontIcon sx={{ color: "white" }} />,
    Smartwatch: <ShoppingCartIcon sx={{ color: "white" }} />,
    Camera: <StorefrontIcon sx={{ color: "white" }} />,
    "Gaming Console": <MonetizationOnIcon sx={{ color: "white" }} />,
  };

  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        color="white"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Sales Detail
      </Typography>

      <StyledTableContainer>
        <Table>
          <TableHead>
            <StyledTableHead>
              <TableCell sx={{ color: "white" }}>Product</TableCell>
              <TableCell sx={{ color: "white" }}>Revenue</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Progress</TableCell>
            </StyledTableHead>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {icons[row.product] || null}
                    <Typography variant="body1" sx={{ marginLeft: 2, color: "white" }}>
                      {row.product}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "white" }}>{row.revenue}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.status}</TableCell>
                <TableCell>
                  <ProgressBar progress={row.progress} />
                  <Typography
                    variant="body2"
                    color="white"
                    align="center"
                    sx={{ marginTop: "4px" }}
                  >
                    {row.progress}%
                  </Typography>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default TableContent;
