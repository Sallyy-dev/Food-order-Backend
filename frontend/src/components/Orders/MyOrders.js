import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Button,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900px)");

  // fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchOrders();
  }, []);

  // cancel order
  const cancelOrder = async (id) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: "User cancelled order" }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Order cancelled successfully");
        fetchOrders();
      } else {
        alert(data.message || "Failed to cancel order");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // update order status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.order) {
        fetchOrders();
      } else {
        alert(data.message || "Failed to update order");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Generate PDF invoice
  const generateInvoice = (order) => {
    const doc = new jsPDF();

    // Invoice Title
    doc.setFontSize(18);
    doc.setTextColor("#FC8A06");
    doc.text(" Your Order invoice", 105, 15, { align: "center" });

    //  Order Data
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: ${order._id}`, 14, 30);
    doc.text(`Date: ${new Date(order.date).toLocaleString()}`, 14, 38);
    doc.text(`Status: ${order.status}`, 14, 46);
    doc.text(`Total: £${order.totalPrice.toFixed(2)}`, 14, 54);

    // items table
    autoTable(doc, {
      startY: 60,
      head: [["Item", "Size", "Quantity", "Price"]],
      body: order.items.map((item) => [
        item.name,
        item.size,
        item.quantity,
        `£${item.price}`,
      ]),
    });

    doc.save(`Invoice_${order._id.slice(-6)}.pdf`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#FC8A06" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width:"100%",
        background: "#1e1e1e",
        p: { xs: 4, sm: 10 },
      }}
    >
      {/* Title My orser */}
      <Typography
        variant="h5"
        sx={{
          color: "#FC8A06",
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
          marginTop:"35px",
          fontSize: isSmallScreen ? "24px" : isMediumScreen ? "30px" : "35px",
        }}
      >
        My Orders
      </Typography>

      {/* if not orders */}
      {orders.length === 0 ? (
        <Typography sx={{ color: "white", textAlign: "center" }}>
          You have no orders yet.
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {orders.map((order, index) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    background: "#2c2c2c",
                    color: "white",
                    borderRadius: 3,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#FC8A06", fontWeight: "bold", mb: 1 }}
                  >
                    Order #{order._id.slice(-6)}
                  </Typography>
                  <Typography>Status: {order.status}</Typography>
                  <Typography>Total: £{order.totalPrice.toFixed(2)}</Typography>
                  <Typography>
                    Date: {new Date(order.date).toLocaleString()}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    {order.items.map((item, i) => (
                      <Typography
                        key={i}
                        sx={{ fontSize: "14px", color: "#aaa" }}
                      >
                        {item.quantity}x {item.name} ({item.size}) - £
                        {item.price}
                      </Typography>
                    ))}
                  </Box>

                  {/* Actions */}
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* Cancel Order */}
                    {order.status !== "canceled" &&
                      order.status !== "delivered" && (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => cancelOrder(order._id)}
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                          }}
                        >
                          Cancel
                        </Button>
                      )}

                    {/* Preparing + PDF */}
                    {order.status === "pending" && (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#FC8A06",
                          fontWeight: "bold",
                          textTransform: "none",
                          "&:hover": { backgroundColor: "#e97c00" },
                        }}
                        onClick={() => {
                          updateStatus(order._id, "preparing");
                          generateInvoice({ ...order, status: "preparing" });
                        }}
                      >
                        Preparing
                      </Button>
                    )}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
