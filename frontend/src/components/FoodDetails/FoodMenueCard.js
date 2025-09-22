import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { useCart } from "../Bars/CartContext";
import FlyingImage from "../Menue/FlyingImage";

function FoodMenuCard({ item, onSelectSize }) {
  const [selectedSize, setSelectedSize] = useState(
    item.sizes[0]?.size || "default"
  );
  const sizeObj = item.sizes.find((s) => s.size === selectedSize);
  const price = sizeObj ? sizeObj.price : item.price;

  const [quantity] = useState(1);
  // Animation
  const [fly, setFly] = useState(null);
  const { addToCart } = useCart();
  // Add To cart
  const handleAddToCart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cartElement = document.getElementById("cart-icon");
    // Handel Animation
    if (cartElement) {
      const cartRect = cartElement.getBoundingClientRect();
      setFly({
        img: item.image,
        start: { x: rect.left, y: rect.top },
        end: { x: cartRect.left - rect.left, y: cartRect.top - rect.top },
      });

      setTimeout(() => {
        addToCart(item, selectedSize, price, quantity);
      }, 600);
    } else {
      addToCart(item, selectedSize, price, quantity);
    }
  };
  // JSX Component
  return (
    <>
      <Card
        sx={{
          background: "#2c2c2c",
          color: "white",
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          width: "245px",
          transition: "0.3s",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={item.image}
          alt={item.name}
          sx={{ objectFit: "contain", p: 2 }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: "#aaa" }}>
            £{price} ({selectedSize})
          </Typography>
          <Rating
            value={item.rating || 4}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mb: 1 }}
          />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {item.sizes.map((s) => (
              <Button
                key={s.size}
                size="small"
                variant={selectedSize === s.size ? "contained" : "outlined"}
                sx={{
                  fontSize: "0.7rem",
                  borderColor: "#FC8A06",
                  color: selectedSize === s.size ? "white" : "#FC8A06",
                  backgroundColor:
                    selectedSize === s.size ? "#FC8A06" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selectedSize === s.size
                        ? "#e67e00"
                        : "rgba(252,138,6,0.1)",
                  },
                }}
                onClick={() => setSelectedSize(s.size)}
              >
                {s.size} (£{s.price})
              </Button>
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: "#FC8A06",
              "&:hover": { backgroundColor: "#e67e00" },
              borderRadius: "8px",
              fontWeight: "bold",
            }}
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </CardContent>
      </Card>

      {fly && (
        <FlyingImage
          img={fly.img}
          start={fly.start}
          end={fly.end}
          onComplete={() => setFly(null)}
        />
      )}
    </>
  );
}

export default FoodMenuCard;
