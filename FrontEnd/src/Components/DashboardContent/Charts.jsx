import React from 'react'
import { Grid, Card, Typography, } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
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
  

export default function Charts() {
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
    <Grid container spacing={3}>
    {/* Bar Chart */}
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
          Website Views
        </Typography>
        <Typography variant="body2" sx={{ color: "#AAA" }} mb={2}>
          Last Campaign Performance
        </Typography>
        <Bar data={barChartData} />
        <Typography variant="body2" mt={2} sx={{ color: "#AAA" }}>
          Campaign sent 2 days ago
        </Typography>
      </Card>
    </Grid>

    {/* Line Chart 1 */}
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
          Daily Sales
        </Typography>
        <Typography variant="body2" sx={{ color: "#AAA" }} mb={2}>
          (+15%) increase in today sales.
        </Typography>
        <Line data={lineChartData1} />
        <Typography variant="body2" mt={2} sx={{ color: "#AAA" }}>
          Updated 4 min ago
        </Typography>
      </Card>
    </Grid>

    {/* Line Chart 2 */}
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
          Completed Tasks
        </Typography>
        <Typography variant="body2" sx={{ color: "#AAA" }} mb={2}>
          Last Campaign Performance
        </Typography>
        <Line data={lineChartData2} />
        <Typography variant="body2" mt={2} sx={{ color: "#AAA" }}>
          Just updated
        </Typography>
      </Card>
    </Grid>
  </Grid>
  )
}
