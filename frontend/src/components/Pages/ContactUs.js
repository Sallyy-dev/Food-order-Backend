import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      // simulate sending
      setSuccess(true);

      // reset after send
      setFormData({ name: "", email: "", message: "" });

      // hide success after 3s
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <>

    <Box
      id="contact"
      sx={{
        background: "#1e1e1e",
        py: 20,
        px: { xs: 2, sm: 4, md: 8 },
        width:"100%"
        
      }}
    >
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay:  0.2, duration: 0.5 }}
>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#FC8A06",
            mb: 4,
          }}
        >
          Contact Us
        </Typography>

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
          >
            ✅ Message sent successfully!
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Right Side Form */}
          <Grid item xs={12} md={7}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#FC8A06",
                  color: "#fff",
                  fontWeight: "bold",
                  py: 1.2,
                  "&:hover": { backgroundColor: "#e57a00" },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      </motion.div>
    </Box>
    </>
  );
}

export default ContactUs;

