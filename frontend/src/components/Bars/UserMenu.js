import { Avatar, Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserMenu({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
  settings,
  onLogout,
}) {
  const userData = JSON.parse(localStorage.getItem("user"));

  // Handel Click on Links
  const handleClick = (setting) => {
    // Handel Logout User
    handleCloseUserMenu();
    if (setting.action === "logout") {
      onLogout();
    }
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={userData?.username} src={userData?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        
        id="menu-appbar"
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={() => handleClick(setting)}>
            {setting.action === "logout" ? (
              setting.name
            ) : (
              <Link
                to={setting.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {setting.name}
              </Link>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
