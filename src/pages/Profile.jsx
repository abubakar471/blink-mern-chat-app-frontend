import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import AuthNavbar from "../components/auth-navbar";
import Avatar from "../components/avatar";
import UserRoute from "../components/routes/user-route";
import Modal from '@mui/material/Modal';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Button, IconButton, TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { state, setState } = useContext(UserContext);
    const [info, setInfo] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [loading, setLoading] = useState(false);
    const [fieldValue, setFieldVailue] = useState("");
    const [fieldName, setFieldName] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("field name : ", fieldName);
            console.log("field value : ", fieldValue);

            if (fieldValue.length > 0) {
                const { data } = await axios.post(`/user/edit-user/${fieldName.toLowerCase()}`, {
                    data: fieldValue

                });

                if (fieldName === 'Change Password') {
                    toast("password changed", {
                        icon: "✔"
                    });

                }


                if (fieldName === 'Username') {
                    window, localStorage.setItem("user", JSON.stringify({
                        user: data,
                        token: state.token
                    }));

                    setState({
                        user: data
                    })

                    toast("username changed", {
                        icon: "✔"
                    });

                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
            setFieldName('');
            setFieldVailue('');
            handleClose();
        }
    }

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Do you really want to delete your account?");

        if (confirmation) {
            try {
                const { data } = await axios.post('/user/delete-account');

                if (data.ok) {
                    window.localStorage.removeItem("chat");
                    window.localStorage.removeItem("user");
                    setState(null);
                    navigate("/register");
                    toast("user has been deleted", {
                        icon: "✔"
                    });
                }
            } catch (err) {
                console.log('user deletetion error on client side ', err);
                toast("User could not be deleted", {
                    icon: "❌"
                })
            }
        }

    }
    return (
        <UserRoute>
            <div className="bg-white h-screen">
                <AuthNavbar />

                <div className="md:w-[50%] lg:w-[50%] w-[90%] mx-auto mt-10">

                    <div className="mb-2">
                        <IconButton
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <ArrowBackIosNewIcon
                                color="primary"
                            />
                        </IconButton>
                    </div>

                    <div className="mb-2 flex items-center gap-2">
                        <Avatar
                            online={true}
                            username={state?.user?.username}
                            userId={state?.user?._id}
                        />
                        <span>{state.user.username}</span>
                        <IconButton onClick={() => {
                            setFieldName("Username")
                            handleOpen();
                        }}>
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                    </div>

                    <div className="mt-5">
                        <Button onClick={() => {
                            setFieldName("Change Password")
                            handleOpen();
                        }}
                            color="secondary"
                            variant="contained"
                            className="md:w-[60%] lg:w-[60%] w-[100%] gap-2">
                            <PasswordOutlinedIcon />
                            <span>Change Passowrd</span>
                        </Button>
                    </div>

                    <div className="mt-5">
                        <Button
                            color="error"
                            onClick={handleDeleteAccount}
                            variant="contained"
                            className="md:w-[60%] lg:w-[60%] w-[100%] gap-2">
                            <RemoveCircleOutlinedIcon />
                            <span>Delete Account</span>
                        </Button>
                    </div>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <>
                        <div

                            className="flex mt-20 items-center justify-center"
                        >
                            <form

                                onSubmit={handleSave}
                                className="w-[400px] h-[200px] bg-white flex flex-col items-center gap-2 ">
                                <IconButton
                                    className="z-[837373] absolute top-[1%] left-[45%]"
                                    onClick={handleClose}>
                                    <CancelIcon color="error"
                                        className="bg-red text-red" />
                                </IconButton>
                                <TextField
                                    onChange={e => setFieldVailue(e.target.value)}
                                    className="w-[90%]" variant="outlined"
                                    value={fieldValue}
                                    placeholder={fieldName === 'Username' ? state.user.username : fieldName}
                                />

                                <Button
                                    type="submit"
                                    className="w-[90%] bg-green-500 text-white" variant="contained">
                                    {loading ? "saving" : "save"}
                                </Button>


                            </form>

                        </div>
                    </>
                </Modal>
            </div>
        </UserRoute>
    )
}

export default Profile