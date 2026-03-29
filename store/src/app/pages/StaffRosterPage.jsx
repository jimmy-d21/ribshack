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
import { staffData } from "../data/staffData";

const StaffRosterPage = () => {
  return (
    <Layout title="Staff Roster">
      <Typography variant="h4" gutterBottom>
        Staff Members
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.staff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.fullName}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.shift || "N/A"}</TableCell>
                <TableCell>{staff.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default StaffRosterPage;
