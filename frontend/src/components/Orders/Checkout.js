import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Alert,
  Snackbar,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../components/Bars/CartContext";
import DeliveryForm from "../Orders/DeliveryForm";
import OrderSummary from "../Orders/OrderSummary";

export default function Checkout({
  cart: cartProp = null,
  userToken: userTokenProp = null,
}) {
  const { cart: cartFromCtx = [], clearCart } = useCart();
  const cart = Array.isArray(cartProp) ? cartProp : cartFromCtx || [];
  const subtotalComputed = cart.reduce(
    (s, i) => s + (i.price || 0) * (i.qty || 0),
    0
  );

  const navigate = useNavigate();
  // useState Data Form
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
    city: "Cairo",
    notes: "",
    paymentMethod: "cash",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  // Token
  const token = userTokenProp || localStorage.getItem("token") || null;
  const total = useMemo(() => subtotalComputed, [subtotalComputed]);
  // Validation Form
  const validate = () => {
    const { first_name, last_name, phone_number, address } = formData;
    if (
      !first_name.trim() ||
      !last_name.trim() ||
      !phone_number.trim() ||
      !address.trim()
    ) {
      setErrorMsg("Please fill in all required delivery fields.");
      return false;
    }
    if (!/^\+?\d{7,15}$/.test(phone_number.trim())) {
      setErrorMsg("Please enter a valid phone number.");
      return false;
    }
    if (!cart.length) {
      setErrorMsg("Your cart is empty.");
      return false;
    }
    return true;
  };
  // Place Order Handel
  const handlePlaceOrder = async () => {
    setErrorMsg("");
    if (!validate()) return;

    const itemsPayload = cart.map((it) => ({
      foodItem: it.id,
      name: it.name,
      quantity: it.qty,
      price: it.price,
      size: it.size || "default",
    }));

    const body = {
      items: itemsPayload,
      deliveryInfo: formData,
      paymentMethod: formData.paymentMethod,
    };

    setLoading(true);
    // API Fetch
    try {
      const res = await fetch("https://food-order-backend-pied.vercel.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("Order response =>", data);

      if (!res.ok) {
        setErrorMsg(data.message || data.error || "Failed to create order.");
        setLoading(false);
        return;
      }

      clearCart && clearCart();
      // Payment Methods Handel
      if (formData.paymentMethod === "card") {
        if (data.iframeUrl) {
          window.location.href = data.iframeUrl;
        } else {
          setErrorMsg("Payment failed. Please try again.");
        }
      } else if (formData.paymentMethod === "cash") {
        setSuccessOpen(true);
        setTimeout(() => navigate("/my-orders"), 1200);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  // JSX component
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, sm: 15 },
        background: "#1e1e1e",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          mt: { xs: 15, sm: 2 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#FC8A06",
            mb: 3,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Checkout
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6} sx={{ width: "400px" }}>
            <Paper sx={{ p: 3 }}>
              <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                Delivery information
              </Typography>
              {errorMsg && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMsg}
                </Alert>
              )}

              <DeliveryForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handlePlaceOrder}
                loading={loading}
                cartEmpty={cart.length === 0}
              />

              <FormControl component="fieldset" sx={{ mt: 3 }}>
                <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                  Payment Method
                </Typography>
                <RadioGroup
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label="Pay by Card"
                  />
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <OrderSummary cart={cart} total={total} />
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={() => setSuccessOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Order placed successfully! Redirecting to My Orders...
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
