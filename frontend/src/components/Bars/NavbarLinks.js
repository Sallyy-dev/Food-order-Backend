import { Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function NavbarLinks({
  pages,
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}) {
  return (
    <>
      {/* Mobile Responsive */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          keepMounted
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page) => (
            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
              <Link
                to={page.path}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  width: "auto",
                }}
              >
                {page.name}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Desktob Responsive */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex"  },
          justifyContent: "center",
        }}
      >
        {pages.map((page) => (
          <Button
            key={page.name}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              fontWeight: "bold",
              borderRadius: "50px",
              px: 3,
              "&:hover": { backgroundColor: "white", color: "#FC8A06" },
              margin: "20px",
            }}
          >
            <Link
              to={page.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {page.name}
            </Link>
          </Button>
        ))}
      </Box>
    </>
  );
}
