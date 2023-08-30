import { useContext } from "react"
import Avatar from "./avatar"
import { ChatContext } from "../contexts/ChatContext"

const Contact = ({ userId, username, selectedChat,
    setSelectedChat, online, setLoading, setSelectedUser }) => {
    const { chatNow, setChatNow } = useContext(ChatContext);

    return (
        <div
            onClick={() => {
                // console.log('triggered on contact page => ', selectedChat);
                setSelectedUser(null);
                window.localStorage.setItem("chat", JSON.stringify(userId))
                setChatNow(userId);
                setLoading(true);
                setSelectedChat(userId);

            }}
            className={`transition ease-in-out delay-50
                             border-b border-gray-100 flex items-center gap-2 
                             hover:bg-violet-500 hover:text-white
                             cursor-pointer ` + (userId === selectedChat ? 'bg-violet-500 text-white' : '')}
        >
            {userId === selectedChat && (
                <div className="w-2 h-12 bg-purple-900 rounded-r-md"></div>
            )}
            <div className="flex items-center py-2 pl-4 gap-2">
                <Avatar online={online} username={username} userId={userId} />
                {username}
            </div>
        </div>
    )
}

export default Contact