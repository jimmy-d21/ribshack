import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ title, value, subtitle }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" color="primary">
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
