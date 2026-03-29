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
import { menuData } from "../data/menuData";

const MenuManagementPage = () => {
  return (
    <Layout title="Menu Management">
      <Typography variant="h4" gutterBottom>
        Menu Items
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Base Price</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuData.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>₱{item.basePrice}</TableCell>
                <TableCell>{item.isActive ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default MenuManagementPage;
