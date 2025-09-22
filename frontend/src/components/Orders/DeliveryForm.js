import React from "react";
import { Grid, TextField, Button, CircularProgress } from "@mui/material";

export default function DeliveryForm({
  formData,
  setFormData,
  onSubmit,
  loading,
  cartEmpty,
}) {
  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <TextField
          label="First name *"
          fullWidth
          value={formData.first_name}
          onChange={handleChange("first_name")}
          size="small"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Last name *"
          fullWidth
          value={formData.last_name}
          onChange={handleChange("last_name")}
          size="small"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Phone number *"
          fullWidth
          value={formData.phone_number}
          onChange={handleChange("phone_number")}
          size="small"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Email"
          fullWidth
          value={formData.email}
          onChange={handleChange("email")}
          size="small"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Address *"
          fullWidth
          value={formData.address}
          onChange={handleChange("address")}
          size="small"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        />
      </Grid>

      <Grid item>
        <TextField
          label="City"
          fullWidth
          value={formData.city}
          onChange={handleChange("city")}
          size="small"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Notes (optional)"
          fullWidth
          value={formData.notes}
          onChange={handleChange("notes")}
          size="small"
          multiline
          rows={3}
          variant="filled"
          InputProps={{ disableUnderline: true }}
        />
      </Grid>

      <Grid item>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#FC8A06",
            "&:hover": { backgroundColor: "#e67a00" },
            fontWeight: "bold",
          }}
          onClick={onSubmit}
          disabled={loading || cartEmpty}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Place Order"
          )}
        </Button>
      </Grid>
    </Grid>
  );
}
