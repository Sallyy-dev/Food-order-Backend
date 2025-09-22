import React, { useState, useEffect } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import MenuCard from "./MenuCard";
import MenuTabs from "./MenuTabs";
import "../../UI/Menue.css";

const itemsPerPage = 8;

export default function Menu() {
  const [tab, setTab] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  const API_URL = process.env.REACT_APP_API_URL;
// eslint-disable-next-line react-hooks/exhaustive-deps
  // API Fetch
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
  }, [API_URL, setItems]);

  // Tabs Handel
  const filteredItems =
    tab === "All"
      ? items
      : items.filter((item) => item.category && item.category.name === tab);

  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Size selection
  const handleSizeSelect = (itemId, size) =>
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));

  return (
    <>
      <div className="Menue-section">
        <div className="Menue-shadow"></div>
        <h2>Our Menu</h2>
      </div>

      <Box
        sx={{
          background: "#1e1e1e",
          minHeight: "100vh",
          color: "white",
          p: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <MenuTabs
          categories={categories}
          tab={tab}
          setTab={setTab}
          setPage={setPage}
        />

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mt: 4, justifyContent: "center" }}>
          {displayedItems.map((item) => (
            <Grid
              item
              xs={12} 
              sm={6}   
              md={4}   
              lg={3}   
              key={item._id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <MenuCard
                item={item}
                selectedSize={selectedSizes[item._id] || "small"}
                onSelectSize={handleSizeSelect}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            overflowX: { xs: "auto", sm: "visible" }, // scrollable on small screens
            px: { xs: 1, sm: 0 },
          }}
        >
          <Pagination
            count={Math.ceil(filteredItems.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              "& .MuiPaginationItem-root": { color: "white" },
              "& .Mui-selected": { backgroundColor: "#FC8A06", color: "white" },
            }}
          />
        </Box>
      </Box>
    </>
  );
}
