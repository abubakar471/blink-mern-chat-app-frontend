import axios from "axios"
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"
import Loader from "../loader";
import toast from "react-hot-toast";
import Logo from "../logo";
import { IconButton } from "@mui/material";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

const UserRoute = ({ children }) => {
    const navigate = useNavigate();
    const { state } = useContext(UserContext);
    const [ok, setOk] = useState(false);

    const getCurrentUser = async () => {
        try {
            const { data } = await axios.get('/user/currentUser', {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });
            if (data.ok) {
                setOk(true)
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error)
            if (error && error.response) {
                toast(error.response.data, {
                    icon: "❌",
                    id: "unauthorized"
                });
            }
            navigate("/login");
        }
    }

    useEffect(() => {
        if (state && state.token) getCurrentUser();
    }, [state && state.token]);

    state === null && setTimeout(() => {
        getCurrentUser();
    }, 1000);

    return !ok ? <Loader /> : <div style={{
        overflow: "hidden"
    }}>


        {children}
    </div>
}

export default UserRoute



