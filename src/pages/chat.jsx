import { useContext, useEffect, useRef, useState } from "react"
import UserRoute from "../components/routes/user-route"
import { UserContext } from "../contexts/UserContext";
import Avatar from "../components/avatar";
import Logo from "../components/logo";
import _ from "lodash";
import axios from "axios";
import toast from "react-hot-toast"
import { CircularProgress, IconButton } from "@mui/material";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Loader from "../components/loader";
import Contact from "../components/Contact";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../contexts/ChatContext";
import ChatBox from "../components/chat-box";
import ChatList from "../components/chat-list";
import AuthNavbar from "../components/auth-navbar";

const Chat = () => {
    const navigate = useNavigate();
    const [ws, setWs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [offlinePeople, setOfflinePeople] = useState({});
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessageText, setNewMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const { state, setState } = useContext(UserContext);
    const { chatNow, setChatNow } = useContext(ChatContext);
    const divUnderMessagesRef = useRef();
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {

        if (state && state.token) {
            const connectToWebSocket = () => {
                const ws = new WebSocket(`wss://https://knowledgeable-endurable-aftermath.glitch.me`, `${state.token}`);
                setWs(ws);
                ws.addEventListener('message', handleMessage);
                ws.addEventListener('error', () => {
                    setUploading(false);
                    setLoading(false);
                })
                ws.addEventListener('close', () => {
                    toast("Connection lost. Trying to reconnect", {
                        id: "reconnect to websocket"
                    });
                    setTimeout(() => {
                        connectToWebSocket()
                    }, 1000);
                })
            }

            const handleMessage = (e) => {
                const messageData = JSON.parse(e.data);

                if ('online' in messageData) {
                    showOnlinePeople(messageData.online);
                } else if ('text' in messageData) {
                    console.log('chatNow : ', chatNow)
                    console.log('messageData => ', messageData);
                    if (messageData.sender === state.user._id) {
                        console.log('sending');
                        setUploading(false);
                        setMessages(prev => ([...prev, { ...messageData }]));
                    }

                    if ((messageData.recipient === state.user._id)) {
                        console.log("messageData.sender", messageData.sender);
                        console.log("chatNow", JSON.parse(window.localStorage.getItem("chat")));
                        if ((messageData.sender === JSON.parse(window.localStorage.getItem("chat")))) {
                            console.log('receiveing');
                            setMessages(prev => ([...prev, { ...messageData }]));
                        }


                    }


                  
                    // console.log("messageData", messageData);
                    // if (messageData.sender === state.user._id) {
                    //     console.log('ghghghghghghg')
                    //     // console.log("chatNow => ", chatNow);
                    //     // console.log(`state user is ${state.user.username}`)
                    //     // console.log('messageData.sender === state.user._id', messageData.sender === state.user._id);
                    //     setMessages(prev => ([...prev, { ...messageData }]));

                    // }
                    // console.log('selectedChat', selectedChat);
                    // console.log('chat now axios', chatNow)

                    // if (messageData.recipient === state.user._id && messageData.sender === chatNow) {
                    //     console.log("chatNow => ", chatNow);
                    //     setMessages(prev => ([...prev, { ...messageData }]));
                    //     // if (messageData.sender === chatNow) {
                    //     //     // console.log(`state user is ${state.user.username}`)
                    //     //     // console.log(`messageData.sender === chatNow._id`, chatNow.userId)
                    //     // setMessages(prev => ([...prev, { ...messageData }]));
                    //     // } else {
                    //     //     console.log('2nd condition block triggered')
                    //     // }
                    // }
                }
            }

            const showOnlinePeople = (peopleArray) => {
                const people = {};
                peopleArray.forEach(({ username, userId }) => {
                    people[userId] = username;
                });
                setOnlinePeople(people);
            }

            connectToWebSocket();
        }



    }, [state && state.token]);

    // useEffect(() => {
    //     // console.log(import.meta.env.VITE_BLINK_WEB_SOCKET)
    //     if (state && state.token) {

    //         const connectToWebSocket = () => {
    //             const ws = new WebSocket(`ws://192.168.1.12:8000`, `${state.token}`);
    //             setWs(ws);
    //             ws.addEventListener('message', handleMessage);
    //             ws.addEventListener('close', () => {
    //                 toast("Connection lost. Trying to reconnect", {
    //                     id: "reconnect to websocket"
    //                 });
    //                 setTimeout(() => {
    //                     connectToWebSocket()
    //                 }, 1000);
    //             })
    //         }

    //         const showOnlinePeople = (peopleArray) => {
    //         }

    //         const handleMessage = (e) => {
    //         }

    //         connectToWebSocket()

    //     }

    // }, [state && state.token]);

    useEffect(() => {
        const div = divUnderMessagesRef.current;
        if (div) {
            div.scrollIntoView({ behavior: "smooth", block: "end" })
        }
    }, [messages])

    useEffect(() => {
        console.log('selected chat in effect triggered');

        // dont setChat after before this if block it will shut down the whole backend 
        // couldn't figure out why set inside the if block below if you have to
        if (selectedChat) {
            console.log('selected chat', selectedChat);
            console.log('selectedChatNow ', chatNow);

            try {
                setLoading(true);
                axios.get(`/message/${selectedChat}`)
                    .then((response) => {
                        setSelectedUser(response.data.user);
                        // setChatNow(response.data.user._id);
                        setMessages(response.data.messages);
                    })
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    }, [selectedChat]);
    useEffect(() => {
        console.log("chat now triggered in effect");
        // console.log(chatNow)
    }, [chatNow]);
    useEffect(() => {
        axios.get('/user/people')
            .then((response) => {
                const offlinePeopleArr = response.data
                    .filter(p => p._id !== state?.user?._id)
                    .filter(p => !Object.keys(onlinePeople).includes(p._id))

                const offlinePeople = {};
                offlinePeopleArr.forEach(p => {
                    offlinePeople[p._id] = p.username;
                })
                setOfflinePeople(offlinePeople)
            })
            .catch(err => {
                if (err && err.response) {
                    toast(err.response.data, {
                        icon: "❌"
                    });
                }
            })
    }, [onlinePeople]);

    const sendMessage = async (e, file = null) => {

        if (e) e.preventDefault();

        ws.send(JSON.stringify({
            sender: state.user._id,
            recipient: selectedChat,
            text: newMessageText,
            file
        }))
        // setMessages(prev => ([...prev, {
        //     text: newMessageText,
        //     sender: state?.user?._id,
        //     recipient: selectedChat,
        //     _id: Date.now()
        // }]));
        // if (file) {
        //     axios.get(`/message/${selectedChat}`)
        //         .then((response) => {
        //             console.log('file uploaded', response.data)
        //             setMessages(response.data.messages);
        //         })
        // }

        setNewMessageText('');
    }

    const sendFile = async (e) => {
        // initially on fileupload if we send the file directly to backend it goes as a 
        // binary data and that wont work, so we need to convert the file into base 64 data
        // before we send it to our backend below how we convert our file input into base 64
        // data shown
        setUploading(true);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            // by saying null we mean we are not passing any event but just the base 64 converted file
            // and reader.result is our base 64 converted file
            sendMessage(null, {
                name: e.target.files[0].name,
                data: reader.result
            })
        }

    }

    const onlinePeopleExclOurUser = { ...onlinePeople };
    delete onlinePeopleExclOurUser[state?.user?._id];

    // create a new array removing the duplicate messages from state and we will sort 
    // them according to their _id
    const messagesWithoutDupes = _.uniqBy(messages, '_id');

    const logout = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('/auth/logout');
            if (data.ok) {
                console.log(data.ok);
                window.localStorage.removeItem("user");
                setState(null);
                setWs(null);
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

    // program to get the file extension

    function getFileExtension(filename) {

        // get file extension
        const extension = filename.split('.').pop();

        switch (extension) {
            case 'png':
                return 'jpg';
            case 'gif':
                return 'jpg';
            case 'jpeg':
                return 'jpg';
            case 'zip':
                return 'rar';
            default:
                return extension;
        }

    }


    return (
        <UserRoute>
            <div className="h-[100vh]">
                {/* navbar */}
                <AuthNavbar />

                <div className={
                `${open && 'w-[100%]'} 
                mx-auto flex
                h-[90vh] md:h-[90vh] lg:h-[90vh] 
                justify-center`}>
                    <ChatList
                        onlinePeopleExclOurUser={onlinePeopleExclOurUser}
                        offlinePeople={offlinePeople}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        loading={loading}
                        setLoading={setLoading}
                        setSelectedUser={setSelectedUser}
                        logout={logout}
                        open={open}
                    />

                    <ChatBox
                        loading={loading} setLoading={setLoading}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        messagesWithoutDupes={messagesWithoutDupes}
                        uploading={uploading}
                        setUploading={setUploading}
                        newMessageText={newMessageText}
                        setNewMessageText={setNewMessageText}
                        divUnderMessagesRef={divUnderMessagesRef}
                        onlinePeopleExclOurUser={onlinePeopleExclOurUser}
                        getFileExtension={getFileExtension}
                        sendMessage={sendMessage}
                        sendFile={sendFile}
                        offlinePeople={offlinePeople}
                    />
                </div>
            </div>
        </UserRoute>
    )
}

export default Chat
