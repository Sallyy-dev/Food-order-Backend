import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  SwipeableDrawer,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({
  cartOpen,
  setCartOpen,
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const navigate = useNavigate();

  // Handel The Drawer
  const handleCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  // Cart Container
  const cartList = (
    <Box
      sx={{
        p: 3,
        position: "relative",
        backgroundColor: "#FC8A06",
        height: "170vh",
        width: { xs: "100vw", sm: 400 },
      }}
      role="presentation"
    >
      {/* Close Icon */}
      <IconButton
        onClick={() => setCartOpen(false)}
        sx={{ position: "absolute", top: 10, right: 10, color: "#fff" }}
      >
        <CloseIcon />
      </IconButton>

      <Typography
        variant="h6"
        sx={{ mb: 4, fontWeight: "bold", mt: 4, color: "#fff" }}
      >
        Your Cart
      </Typography>

      {cart.length === 0 && (
        <Typography sx={{ color: "#fff" }}>Your cart is empty</Typography>
      )}

      {cart.map((item) => (
        <Box
          key={`${item.id}_${item.size}`}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f4f4f4",
            p: 1.5,
            borderRadius: "8px",
            mb: 2,
            position: "relative",
          }}
        >
          {/* Remove Item */}
          <IconButton
            onClick={() => removeItem(item.id, item.size)}
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              backgroundColor: "#FC8A06",
              color: "#fff",
              "&:hover": { backgroundColor: "#e67a00" },
            }}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Product Image */}
          <img
            src={item.img}
            alt={item.name}
            width="56"
            height="56"
            style={{ borderRadius: 8, objectFit: "cover" }}
          />

          {/* Product Info */}
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>{item.name}</Typography>
            <Typography sx={{ color: "gray", fontSize: "13px" }}>
              Size: {item.size}
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "14px" }}>
              £{(item.price * item.qty).toFixed(2)}
            </Typography>
          </Box>

          {/* Quantity Controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              p: { xs: 0.5, sm: 1 },
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              width: "fit-content",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => decreaseQty(item.id, item.size)}
              sx={{
                minWidth: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                borderRadius: "50%",
                fontWeight: "bold",
                backgroundColor: "#f44336",
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
            >
              -
            </Button>

            <Typography
              sx={{
                minWidth: { xs: 24, sm: 32 },
                textAlign: "center",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                fontWeight: 600,
              }}
            >
              {item.qty}
            </Typography>

            <Button
              variant="contained"
              size="small"
              onClick={() => increaseQty(item.id, item.size)}
              sx={{
                minWidth: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                borderRadius: "50%",
                fontWeight: "bold",
                backgroundColor: "#4caf50",
                "&:hover": { backgroundColor: "#388e3c" },
              }}
            >
              +
            </Button>
          </Box>
        </Box>
      ))}

      <Divider sx={{ my: 2, borderColor: "#fff" }} />

      {/* Total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          mb: 1,
          color: "#fff",
        }}
      >
        <h4>Total to pay:</h4>
        <span style={{ color: "red" }}>£{total.toFixed(2)}</span>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column" },
          justifyContent: "center",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#FC8A06",
            fontWeight: "bold",
            borderRadius: "12px",
            px: 2,
            py: 1,

            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            transition: "0.5s",
            "&:hover": {
              borderColor: "#FC8A06",
              color: "#fff",
              backgroundColor: "#FC8A06",
            },
          }}
          onClick={() => setCartOpen(false)}
        >
          Continue shopping
        </Button>

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#FC8A06",
            fontWeight: "bold",
            borderRadius: "12px",
            px: 2,
            py: 1,
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            transition: "0.5s",
            "&:hover": {
              backgroundColor: "#FC8A06",
              color: "#fff",
            },
          }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      onOpen={() => setCartOpen(true)}
    >
      {cartList}
    </SwipeableDrawer>
  );
}
