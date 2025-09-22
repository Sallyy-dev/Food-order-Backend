import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export default function MenuTabs({ categories, tab, setTab, setPage }) {
  const isMobile = useMediaQuery("(max-width:700px)");
  // Tabs
  const handleChange = (value) => {
    setTab(value);
    setPage(1);
  };
  // Tabs Responsive
  return isMobile ? (
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <select
        value={tab}
        onChange={(e) => handleChange(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          fontWeight: "bold",
          background: "#2c2c2c",
          color: "white",
          border: "1px solid #FC8A06",
        }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </Box>
  ) : (
    <Tabs
      value={tab}
      onChange={(e, newValue) => handleChange(newValue)}
      centered
      textColor="inherit"
      TabIndicatorProps={{ style: { backgroundColor: "#FC8A06" } }}
      sx={{ "& .MuiTabs-flexContainer": { justifyContent: "center" } }}
    >
      {categories.map((cat) => (
        <Tab
          key={cat}
          value={cat}
          label={cat}
          sx={{
            color: "white",
            fontWeight: "bold",
            textTransform: "capitalize",
            "&.Mui-selected": { color: "#FC8A06" },
          }}
        />
      ))}
    </Tabs>
  );
}
