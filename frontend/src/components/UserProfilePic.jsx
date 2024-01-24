import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import MainContext from "../context/MainContext";

function UserProfilePic() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userLoggedOut, userName } = useContext(MainContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar className="bg-gradient-to-tl from-rose-700 to-pink-600">
          {userName}
        </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/dashboard/profile")}>
          Profile
        </MenuItem>
        <MenuItem onClick={userLoggedOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default UserProfilePic;
