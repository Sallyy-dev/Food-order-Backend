import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../components/Bars/CartContext";
import FlyingImage from "../Menue/FlyingImage";

const FoodDetails = ({ image, name, description, price, sizes = [], _id }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.size || "default");
  const [basePrice, setBasePrice] = useState(sizes[0]?.price || price);
  const [quantity, setQuantity] = useState(1);
  // Animation
  const [fly, setFly] = useState(null);

  // Handel Quantity
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  // Total Price
  const totalPrice = (basePrice * quantity).toFixed(2);

  // Add To Cart
  const handleAddToCart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cartIcon = document
      .getElementById("cart-icon")
      ?.getBoundingClientRect();

    // Animation Cart
    if (cartIcon) {
      setFly({
        img: image,
        start: { x: rect.left, y: rect.top },
        end: { x: cartIcon.left - rect.left, y: cartIcon.top - rect.top },
      });
    }

    setTimeout(() => {
      addToCart({ _id, name, image }, selectedSize, basePrice, quantity);
    }, 600);
  };

  // JSX Component
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          p: 3,
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: "#1e1e2f",
          color: "#fff",
          marginTop: "60px",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: { xs: "100%", md: 350 },
            borderRadius: 2,
            objectFit: "cover",
          }}
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#fff" }}
          >
            {name}
          </Typography>
          {/* Descrption */}
          <Typography variant="body1" sx={{ mb: 2, color: "#bbb" }}>
            {description}
          </Typography>
          {/* Size Food */}
          {sizes.length > 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                mb: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {sizes.map((s) => (
                <Button
                  key={s.size}
                  variant={selectedSize === s.size ? "contained" : "outlined"}
                  sx={{
                    fontSize: "0.8rem",
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
                  onClick={() => {
                    setSelectedSize(s.size);
                    setBasePrice(s.price);
                    setQuantity(1);
                  }}
                >
                  {s.size} (£{s.price})
                </Button>
              ))}
            </Box>
          )}
          {/* Total Price */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "#fff" }}
          >
            Total: £{totalPrice}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={decrement}
              sx={{
                color: "#fff",
                border: "1px solid #fff",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <RemoveIcon />
            </IconButton>

            <Typography sx={{ minWidth: 30, textAlign: "center" }}>
              {quantity}
            </Typography>

            <IconButton
              onClick={increment}
              sx={{
                color: "#fff",
                border: "1px solid #fff",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <AddIcon />
            </IconButton>
            {/* Add To Cart Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f5d589",
                color: "#000",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#e6c566" },
              }}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* Animation */}
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
};

export default FoodDetails;
