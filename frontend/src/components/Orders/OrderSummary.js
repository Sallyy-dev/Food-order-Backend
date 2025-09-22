import React from "react";
import { Box, Typography } from "@mui/material";

export default function OrderSummary({ cart, total }) {
  if (!cart.length)
    return <Typography sx={{ color: "gray" }}>Your cart is empty</Typography>;

  return (
    <>
      {cart.map((it) => (
        <Box
          key={`${it.id}_${it.size}`}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            p: 1,
            borderRadius: 1,
            background: "#1f1f1f",
          }}
        >
          <img
            src={it.img}
            alt={it.name}
            width={64}
            height={64}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>{it.name}</Typography>
            <Typography sx={{ fontSize: 13, color: "gray" }}>
              {it.size} • x{it.qty}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>
            £{((it.price || 0) * (it.qty || 0)).toFixed(2)}
          </Typography>
        </Box>
      ))}

      <Box sx={{ borderTop: "1px dashed #333", pt: 2, mt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography sx={{ color: "gray" }}>Subtotal</Typography>
          <Typography>£{total.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography sx={{ color: "gray" }}>Delivery</Typography>
          <Typography>£0.00</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            fontWeight: "bold",
          }}
        >
          <Typography>Total</Typography>
          <Typography sx={{ color: "red" }}>£{total.toFixed(2)}</Typography>
        </Box>
      </Box>
    </>
  );
}
