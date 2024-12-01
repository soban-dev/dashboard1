import React from "react";
import { Box, Grid, Card, Typography, LinearProgress, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,    // Register "category" scale
  LinearScale,      // Register linear scale for numeric axes
  BarElement,       // For bar charts
  PointElement,     // For line charts
  LineElement,      // For line charts
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TopCards from "../../Components/DashboardContent/TopCards";
import Charts from "../../Components/DashboardContent/Charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DashboardContent() {
  // Data for charts
  const barChartData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Views",
        data: [10, 20, 30, 15, 40, 55, 60],
        backgroundColor: "#36A2EB",
        borderRadius: 4,
      },
    ],
  };

  const lineChartData1 = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 150, 300, 250, 400, 450, 350, 600],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const lineChartData2 = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Tasks",
        data: [150, 300, 200, 350, 450, 400, 550, 450, 600],
        borderColor: "#9C27B0",
        backgroundColor: "rgba(156, 39, 176, 0.2)",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <Box>
      {/* Top Row Cards */}
      <TopCards/>

      {/* Charts */}
       <Charts/>
            {/* Bottom Section */}
            <Grid container spacing={3} mt={4}>
        {/* Projects */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              backgroundColor: "rgb(32 41 64)",
              color: "#FFF",
              padding: 2,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" mb={2}>
              Projects
            </Typography>
            <Typography variant="body2" sx={{ color: "#4CAF50" }} mb={2}>
              <span style={{ fontWeight: "bold" }}>30 done</span> this month
            </Typography>
            <Box>
              {[
                { name: "Material UI XD Version", budget: "$14,000", completion: 80 },
                { name: "Add Progress Track", budget: "$3,000", completion: 50 },
                { name: "Fix Platform Errors", budget: "Not set", completion: 100 },
                { name: "Launch our Mobile App", budget: "$20,500", completion: 100 },
                { name: "Add the New Pricing Page", budget: "$500", completion: 40 },
              ].map((project, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="body1">{project.name}</Typography>
                  <Typography variant="body2">{project.budget}</Typography>
                  <Box sx={{ width: "30%", ml: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={project.completion}
                      sx={{
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            project.completion === 100 ? "#4CAF50" : "#36A2EB",
                        },
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Orders Overview */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "rgb(32 41 64)",
              color: "#FFF",
              padding: 2,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" mb={2}>
              Orders Overview
            </Typography>
            <Typography variant="body2" sx={{ color: "#4CAF50" }} mb={2}>
              24% this month
            </Typography>
            <List>
              {[
                { title: "$2400, Design changes", date: "22 DEC 7:20 PM", color: "#4CAF50" },
                { title: "New order #1832412", date: "21 DEC 11 PM", color: "#E91E63" },
                { title: "Server payments for April", date: "21 DEC 9:34 PM", color: "#36A2EB" },
                { title: "New card added for order #4395133", date: "20 DEC 2:20 AM", color: "#FF9800" },
                { title: "New card added for order #4395133", date: "18 DEC 4:54 AM", color: "#9C27B0" },
              ].map((order, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Box
                      sx={{
                        backgroundColor: order.color,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={order.title} secondary={order.date} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

    </Box>
  );
}

export default DashboardContent;
