import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import Layout from "../components/Layout";
import { inventoryData } from "../data/inventoryData";

const InventoryPage = () => {
  return (
    <Layout title="Inventory Management">
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData.inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>
                  {item.currentStock} {item.unit}
                </TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default InventoryPage;
