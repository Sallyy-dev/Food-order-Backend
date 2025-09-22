import React from "react";
import { useLocation } from "react-router-dom";
import FoodDetails from "../FoodDetails/FoodDetails";
import FoodMenue from "../FoodDetails/FoodMenue"
import { Container, Box } from "@mui/material";
export default function FoodCard() {
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" , marginBottom:"50px"}}>No product selected</h2>;
  }

  return (
    <>
    <Container sx={{ py: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, justifyContent: "center", alignItems: "center" }}>
        <FoodDetails {...item} />
      </Box>
    </Container>
    <FoodMenue/>
    </>
  );
}
