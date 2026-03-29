import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import NotificationBell from "../components/NotificationBell";
import { dashboardData } from "../data/dashboardData";

const DashboardPage = () => {
  const dashboardItems = [
    {
      title: "Today's Revenue",
      value: `₱${dashboardData.todayStats.grossRevenue.toLocaleString()}`,
      subtitle: "Total sales today",
    },
    {
      title: "Total Orders",
      value: dashboardData.todayStats.totalOrders,
      subtitle: "Orders completed",
    },
    {
      title: "Dine-in Orders",
      value: dashboardData.todayStats.dineInOrders,
      subtitle: "In-store orders",
    },
    {
      title: "Delivery Orders",
      value: dashboardData.todayStats.deliveryOrders,
      subtitle: "Delivery orders",
    },
    {
      title: "Avg Order Value",
      value: `₱${dashboardData.todayStats.avgOrderValue}`,
      subtitle: "Average per order",
    },
  ];

  return (
    <Layout title="Store Dashboard">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <NotificationBell count={3} />
      </Box>
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <DashboardCard
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default DashboardPage;
