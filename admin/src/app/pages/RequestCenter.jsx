import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { initialRequests } from "../data/requests";

const RequestCenter = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Request Center
      </Typography>
      <List>
        {initialRequests.map((request) => (
          <ListItem key={request.id} divider>
            <ListItemText
              primary={`${request.type} - ${request.branch}`}
              secondary={request.notes}
            />
            <Chip
              label={request.status}
              color={
                request.status === "pending"
                  ? "warning"
                  : request.status === "approved"
                    ? "success"
                    : "error"
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RequestCenter;
