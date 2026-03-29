import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { initialBranches } from "../data/branches";

const BranchManagement = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Branch Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Branch Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialBranches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.location}</TableCell>
                <TableCell>{branch.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BranchManagement;
