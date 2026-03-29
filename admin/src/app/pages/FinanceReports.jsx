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
import { financeReportsData } from "../data/financeReports";

const FinanceReports = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Finance Reports
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Gross Sales</TableCell>
              <TableCell>Net Sales</TableCell>
              <TableCell>Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financeReportsData.monthlyData.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.month}</TableCell>
                <TableCell>₱{report.grossSales.toLocaleString()}</TableCell>
                <TableCell>₱{report.netSales.toLocaleString()}</TableCell>
                <TableCell>₱{report.profit.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FinanceReports;
