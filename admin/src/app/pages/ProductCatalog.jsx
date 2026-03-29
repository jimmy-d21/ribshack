import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { initialProducts } from "../data/products";

const ProductCatalog = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Catalog
      </Typography>
      <Grid container spacing={3}>
        {initialProducts.map((product) => (
          <Grid item xs={12} md={6} lg={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image || "/placeholder.jpg"}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="h6" color="primary">
                  ₱{product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductCatalog;
