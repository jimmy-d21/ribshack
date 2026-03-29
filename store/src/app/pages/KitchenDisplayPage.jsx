import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import Layout from "../components/Layout";

const KitchenDisplayPage = () => {
  const orders = [
    { id: 1, items: "Burger, Fries", status: "preparing" },
    { id: 2, items: "Pizza, Salad", status: "ready" },
    { id: 3, items: "Chicken Wings", status: "cooking" },
  ];

  return (
    <Layout title="Kitchen Display">
      <Typography variant="h4" gutterBottom>
        Kitchen Orders
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id} divider>
            <ListItemText
              primary={`Order #${order.id}`}
              secondary={order.items}
            />
            <Chip
              label={order.status}
              color={order.status === "ready" ? "success" : "warning"}
            />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export default KitchenDisplayPage;
