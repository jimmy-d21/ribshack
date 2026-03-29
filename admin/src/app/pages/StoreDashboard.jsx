import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { storeDashboardData } from "../data/storeDashboard";

const StoreDashboard = () => {
  const data = storeDashboardData.getStoreDashboardData(1);
  const dashboardItems = [
    { title: "Today Revenue", value: `₱${data.todayStats.revenue}` },
    { title: "Orders", value: data.todayStats.orders },
    { title: "Avg Order Value", value: `₱${data.todayStats.avgOrderValue}` },
    { title: "Customers", value: data.todayStats.customers },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {data.branchName} Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4" color="primary">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StoreDashboard;
