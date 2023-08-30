import { CircularProgress, IconButton } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Loader from "./loader"
import Avatar from "./avatar"
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import MobileChatList from "./mobile-chat-list";

const ChatBox = ({ loading, setLoading,
    selectedChat, setSelectedChat, selectedUser,
    setSelectedUser, messagesWithoutDupes,
    uploading, setUploading, newMessageText,
    setNewMessageText, divUnderMessagesRef,
    onlinePeopleExclOurUser,
    getFileExtension, sendMessage, sendFile,

    open, logout, offlinePeople,
}) => {

    const { state, setState } = useContext(UserContext);
    return (
        <section

            className="flex flex-col 
        md:w-2/3 lg:w-2/3 p-0 sm:w-[800px] 
        sm:mx-auto
        w-[100%]
        ">
            <div className="h-screen md:h-[900px] lg:h-[900px]
             sm:w-full">
                {loading ? (
                    <div className="text-white h-[100%] flex items-center justify-center">
                        <Loader />
                    </div>
                ) : <>
                    {!selectedChat && (
                        <>
                            {/* mobile view */}
                            <MobileChatList
                                loading={loading}
                                setLoading={setLoading}
                                offlinePeople={offlinePeople}
                                onlinePeopleExclOurUser={onlinePeopleExclOurUser}
                                selectedChat={selectedChat}
                                setSelectedChat={setSelectedChat}
                                selectedUser={selectedUser}
                                setSelectedUser={setSelectedChat}
                            />

                            <div className="hidden md:flex lg:flex flex items-center justify-center h-screen">
                                <div className="flex flex-col items-center justify-center bg-white/5 w-48 h-48 mx-auto rounded-lg">
                                    <img className="w-20 h-20 mb-2" src="/assets/logo3.png" alt="logo" />
                                    <div className="transition text-purple-500 font-semibold mb-2">
                                        <span className="text-lg font-bold">&larr;</span> blink
                                    </div>
                                </div>
                            </div>
                        </>


                    )}

                    {!!selectedChat && (
                        <div className="relative h-[100%]">
                            {/* topbar */}
                            <div
                                className="sticky border-b bg-black z-[999] p-2 text-white 
                                text-md flex items-center gap-2"
                                style={{
                                    background: "url(/assets/chat-topbar-bg-2.jpg) rgba(0,0,0,0.9)",
                                    backgroundSize: "cover",
                                    backgroundAttachment: "fixed",
                                    backgroundBlendMode: "darken",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >
                                {!!selectedChat && (loading ? <CircularProgress disableShrink size="1.5rem" color="secondary" /> : (
                                    <>
                                        <IconButton onClick={() => {
                                            setSelectedChat(null)
                                        }}>
                                            <ArrowBackIosNewIcon
                                                style={{
                                                    color: "#1589FF"
                                                }}
                                                className="text-violet-500"
                                            />
                                        </IconButton>
                                        <Avatar
                                            userId={selectedUser?._id}
                                            username={selectedUser?.username || ''}
                                            online={Object.keys(onlinePeopleExclOurUser).find(oId => oId === selectedChat)}
                                        />
                                        <span>{selectedUser?.username}</span>
                                    </>
                                ))}
                            </div>

                            {/* message list */}
                            <div
                                className="overflow-auto mt-10 absolute top-12 right-0 left-0 bottom-2">
                                {messagesWithoutDupes.map((message) => (
                                    <div
                                        key={message._id}
                                        className={"" + (message.sender === state?.user?._id ? 'text-right' : 'text-left')}>
                                        <div className={"inline-block text-left rounded-lg text-sm m-2 p-2 " + (message.sender === state?.user?._id ? 'bg-purple-500 text-white' : 'bg-white text-gray')}>
                                            {message.text}

                                            {message.file && (
                                                <>
                                                    <div
                                                        style={{
                                                            width: "180px",
                                                            height: "170px"
                                                        }}
                                                    >
                                                        {
                                                            (getFileExtension(message.file) === 'jpg') ? (
                                                                <a
                                                                    target="_blank"
                                                                    className="underline"
                                                                    href={axios.defaults.baseURL + '/uploads/' + message.file}>


                                                                    <img
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            borderRadius: "5px",
                                                                            objectFit: "cover"
                                                                        }}
                                                                        src={`${axios.defaults.baseURL}/uploads/${message.file}`}
                                                                        alt={message.file}
                                                                        loading="lazy"
                                                                    />

                                                                </a>
                                                            ) : ((getFileExtension(message.file) === 'rar') ? (
                                                                <a
                                                                    target="_blank"
                                                                    className="underline"
                                                                    href={axios.defaults.baseURL + '/uploads/' + message.file}>
                                                                    <div className="flex items-center justify-center h-full">
                                                                        <img
                                                                            style={{
                                                                                width: "100px",
                                                                                height: "100px"
                                                                            }}
                                                                            src="/assets/rar_logo_5266.png"
                                                                            alt="rar_logo_5266"
                                                                        />
                                                                    </div>
                                                                </a>
                                                            ) : (getFileExtension(message.file) === 'mp4') && (
                                                                <>
                                                                    <video loop controls
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            borderRadius: "5px",
                                                                            objectFit: "cover"
                                                                        }}
                                                                        className="w-full mt-8 aspect-video 
                                                            rounded-lg border bg-black">
                                                                        <source src={`${axios.defaults.baseURL}/uploads/${message.file}`} type="video/webm" />
                                                                        <source src={`${axios.defaults.baseURL}/uploads/${message.file}`} type="video/mp4" />
                                                                        sorry , your browser does not support html5 videos
                                                                    </video>
                                                                </>
                                                            ))
                                                        }

                                                        {
                                                            (getFileExtension(message.file) === 'pdf') && (
                                                                <a
                                                                    target="_blank"
                                                                    className="underline"
                                                                    href={axios.defaults.baseURL + '/uploads/' + message.file}>
                                                                    <div className="flex items-center justify-center h-full">
                                                                        <img
                                                                            style={{
                                                                                width: "100px",
                                                                                height: "100px"
                                                                            }}
                                                                            src="/assets/pdf_logo_1637.png"
                                                                            alt="pdf_logo_1637"
                                                                        />
                                                                    </div>
                                                                </a>
                                                            )
                                                        }

                                                    </div>
                                                    <div
                                                        style={{
                                                            boxShadow: "0 .125px 1px gray"
                                                        }}
                                                        className="flex items-center text-[12px]
                                            rounded-lg mt-2 gap-1 border-b p-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                                                            <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                                        </svg>
                                                        <a
                                                            target="_blank"
                                                            className="underline"
                                                            href={axios.defaults.baseURL + '/uploads/' + message.file}>
                                                            {message.file}
                                                        </a>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <div ref={divUnderMessagesRef}></div>
                            </div>
                        </div>
                    )}
                </>}
            </div>

            {!!selectedChat && (
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        className="bg-white border-2 border-violet-500
             p-2 outline-violet-500 flex-grow rounded-sm"
                        type="text"
                        placeholder="type your message"
                        value={newMessageText}
                        onChange={e => setNewMessageText(e.target.value)}
                        autoFocus
                        autoCorrect="true"
                    />

                    <label className="bg-purple-500 transition ease-in-out hover:bg-purple-800 p-2 text-white cursor-pointer rounded-sm" >
                        <input disabled={uploading} type="file" className="hidden"
                            onChange={sendFile}
                        />
                        {uploading ? <CircularProgress color="secondary"
                            size="1.5rem"
                            disableShrink
                        /> : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                            </svg>
                        )}
                    </label>
                    <button disabled={uploading} type="submit" className="bg-violet-500 transition ease-in-out hover:bg-violet-800 p-2 text-white cursor-pointer rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
            )}
        </section>
    )
}

export default ChatBox