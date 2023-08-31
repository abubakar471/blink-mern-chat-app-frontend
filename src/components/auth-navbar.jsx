import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Logo from "./logo";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthNavbar = () => {
    const { state, setState } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const logout = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/auth/logout');
            if (data.ok) {
                console.log(data.ok);
                window.localStorage.removeItem("user");
                setState(null);
                toast("Logged out successfully", {
                    icon: "✔"
                });
                navigate("/login");
            }
        } catch (err) {
            if (err && err.response) {
                toast(err.response.data, {
                    icon: "❌"
                });
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <nav className="flex 
        items-center justify-between text-purple-500 fixed w-[100%] top-0 left-0 relative"
            style={{
                background: "url(/assets/chat-topbar-bg.jpg) rgba(0,0,0,0.9)",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundBlendMode: "darken",
                backgroundRepeat: "no-repeat",
                zIndex: "9999999"
            }}>
            <div
                className="flex items-center justify-between mx-auto w-[90%] "
            >
                <Logo />
                <div>
                    <IconButton
                        onClick={handleMenu}
                    >
                        <MenuOpenOutlinedIcon
                            style={{
                                fontSize: "32px",
                                color: "yellow"
                            }}
                        />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        style={{
                            zIndex: "9999999999",
                            top: "5%"
                        }}
                    >
                        <MenuItem
                            className="gap-2"
                            onClick={() => {
                                handleClose();
                                navigate("/profile");
                            }}>
                            <AccountCircleIcon />
                            <span>Profile</span>
                        </MenuItem>
                        <MenuItem
                            className="gap-2"
                            onClick={() => {
                                handleClose();
                                logout();
                            }

                            }>
                            <LogoutIcon />
                            <span>Log Out</span>
                        </MenuItem>
                    </Menu>
                </div>
            </div>

        </nav>
    )
}

export default AuthNavbar