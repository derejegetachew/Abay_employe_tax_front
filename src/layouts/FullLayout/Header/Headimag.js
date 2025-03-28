import React, { useState } from 'react';
import axios from "axios";
//import { Link } from 'react-router-dom';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Typography
} from "@mui/material";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";

import userimg from "../../../assets/images/users/user.jpg";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../utils/tokenUtils";
const user = currentUser();
console.log(user)
let fullName=`${user.first_name} ${user.middle_name}`
let position=`${user.position}`

const Header = (props) => {
  const [selectedFile, setSelectedFile] = useState(null); // For file upload
  const [previewImage, setPreviewImage] = useState(user.profile_picture)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file)); // Show image preview
  };
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    formData.append("userId", user.id); // Assuming user ID is available

    try {
      const response = await axios.post("/api/upload-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Image uploaded:", response.data);
      // Optionally, update the user state or image preview here
    } catch (error) {
      console.error("Error uploading the image", error);
    }
  };


  const handleLogout = () => {
    // Redirect to the login page or any other desired page
    localStorage.clear()
    navigate("/login", { replace: true }); // Replace "/login" with the appropriate route
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  // 5
  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar sx={{ background: "#D3D3D3" }}>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
              marginLeft: {
          xs: 'auto', // Aligns the icon to the left on small screens
        },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
      
        <Box flexGrow={1} />
        <Typography variant="h1" style={{ textAlign: "center", fontWeight: "bold", color: "black" ,fontSize: "1.5rem",width:'100%'}}>
          Abay Bank Employee Tax Record System
        </Typography>
        {/**  */}
        

        {/* ------------------------------------------- */}
        {/* Notifications Dropdown */}
        {/* ------------------------------------------- */}
   
        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              // src={userimg}
              // alt={userimg}
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose4}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
             {fullName}
            </Box>
            
          </MenuItem>
          <MenuItem onClick={handleClose4}>
            {/* <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            /> */}
            <Box
              sx={{
                ml: 2,
              }}
            >
           
             {position}
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <Button onClick={handleUpload}>Upload</Button>
          </MenuItem>
          
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
