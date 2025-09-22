import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Badge,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import NavbarLinks from "./NavbarLinks";
import UserMenu from "./UserMenu";
import CartDrawer from "./CartDrawer";
import { useCart } from "./CartContext";

// Pages links
const pages = [
  { name: "Home", path: "/" },
  { name: "Menue", path: "/menue" },
  { name: "Products", path: "/products" },
  { name: "MyOrders", path: "/my-orders" },
  { name: "ContactUS", path: "/contact" },
];
// settings Links
const settings = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
  { name: "Logout", action: "logout" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [opacity, setOpacity] = React.useState(1);

  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();

  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Handel Logout User
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Quantity Total
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Scroll Effect
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newOpacity = scrollTop > 50 ? 0.7 : 1;
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // JSX Component
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: `rgba(252, 138, 6, ${opacity})`,
          transition: "background-color 0.3s ease",
        }}
      >
        <Container maxWidth="l">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Order
            </Typography>

            <NavbarLinks
              pages={pages}
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
            />

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Cart Icon */}
              <IconButton
                id="cart-icon"
                sx={{ color: "white" }}
                onClick={() => setCartOpen(true)}
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {/* Handel User Links */}
              <UserMenu
                settings={settings}
                anchorElUser={anchorElUser}
                handleOpenUserMenu={handleOpenUserMenu}
                handleCloseUserMenu={handleCloseUserMenu}
                onLogout={handleLogout}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Handel Cart Container */}
      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeItem={removeItem}
      />
    </>
  );
}

export default ResponsiveAppBar;
