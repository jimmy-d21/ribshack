import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { globalAnalyticsData } from "../data/globalAnalytics";

const Analytics = () => {
  const kpiData = [
    {
      title: "Total Revenue",
      value: `₱${globalAnalyticsData.kpi.totalRevenue.toLocaleString()}`,
      change: globalAnalyticsData.kpi.trends.revenue,
    },
    {
      title: "Total Orders",
      value: globalAnalyticsData.kpi.totalOrders.toLocaleString(),
      change: globalAnalyticsData.kpi.trends.orders,
    },
    {
      title: "Active Stores",
      value: globalAnalyticsData.kpi.activeStores,
      change: globalAnalyticsData.kpi.trends.stores,
    },
    {
      title: "Avg Order Value",
      value: `₱${globalAnalyticsData.kpi.avgOrderValue}`,
      change: globalAnalyticsData.kpi.trends.avgOrder,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Global Analytics
      </Typography>
      <Grid container spacing={3}>
        {kpiData.map((item, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4" color="primary">
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Analytics;
