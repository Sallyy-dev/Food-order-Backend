import React, { useState, useEffect } from "react";
import { Box, Grid, Pagination, useMediaQuery } from "@mui/material";
import FoodMenuCard from "../FoodDetails/FoodMenueCard";
import "../../UI/Menue.css";

const itemsPerPage = 8;

export default function Menu() {
  const [tab] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [items, setItems] = useState([]);
  const [setCategories] = useState(["All"]);
  const [cart, setCart] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  // Responsive media query
  const isSmallScreen = useMediaQuery("(max-idth:400px)");
  const isMediumScreen = useMediaQuery("(max-width:500px)");

// eslint-disable-next-line react-hooks/exhaustive-deps
  // API FETCH
  useEffect(() => {
    fetch(`${API_URL}/menu/menu-types`)
      .then((res) => res.json())
      .then((data) => data.success && setCategories(["All", ...data.data]))
      .catch((err) => console.error(err));
  }, [API_URL, setCategories]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch(`${API_URL}/foodItems`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, [API_URL, setCategories]);

  // Handel Tabs
  const filteredItems =
    tab === "All"
      ? items
      : items.filter((item) => item.category && item.category.name === tab);

  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle Size Select
  const handleSizeSelect = (itemId, size) =>
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));

  // Add To Cart
  const handleAddToCart = (item, size) => {
    setCart((prevCart) => [
      ...prevCart,
      {
        ...item,
        selectedSize: size,
        price: item.sizes.find((s) => s.size === size)?.price || item.price,
        quantity: 1,
      },
    ]);
    console.log("Cart:", cart);
  };

  // JSX Component
  return (
    <Box
      sx={{ background: "#1e1e1e", minHeight: "100vh", color: "white", p: 4 }}
    >
      <h2>Our Menu</h2>

      <Grid container spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
        {displayedItems.map((item) => (
          <Grid item xs={12} sm={6} md={5} key={item._id}>
            <FoodMenuCard
              item={item}
              selectedSize={selectedSizes[item._id] || "small"}
              onSelectSize={handleSizeSelect}
              onAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredItems.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          siblingCount={isSmallScreen ? 0 : isMediumScreen ? 1 : 2}
          boundaryCount={isSmallScreen ? 1 : 2}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#FC8A06", 
              fontWeight: "bold",
              fontSize: isSmallScreen
                ? "18px"
                : isMediumScreen
                ? "1rem"
                : "1rem",
              minWidth: 30,
              height: 30,
              borderRadius: 2,
              border: "1px solid #FC8A06",
              "&:hover": {
                backgroundColor: "rgba(252,138,6,0.2)",
              },
            },
            "& .Mui-selected": {
              backgroundColor: "#FC8A06",
              color: "white",
              "&:hover": {
                backgroundColor: "#e67e00",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
