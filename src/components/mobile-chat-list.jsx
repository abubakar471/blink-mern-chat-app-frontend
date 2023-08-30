import { useContext } from "react"
import Contact from "./Contact"
import Avatar from "./avatar"
import { UserContext } from "../contexts/UserContext"

const MobileChatList = ({
    onlinePeopleExclOurUser, offlinePeople,
    selectedChat, setSelectedChat,
    setSelectedUser, loading, setLoading,
    logout
}) => {
    const { state, setState } = useContext(UserContext);

    return (
        <div className="mt-5 md:hidden lg:hidden 
        bg-white-500 w-full">
            <div className="text-white">

                <div 
                style={{
                    height : "100vw"
                }}
                className="flex-grow px-2 overflow-auto">
                    <h1 className="text-pink-500 text-xl"># Chats</h1>
                    {/* <Logo setSelectedChat={setSelectedChat} /> */}
                    {/* <h1 className="text-green-500 font-semibold">Onine People ({Object.keys(onlinePeopleExclOurUser).length})</h1> */}
                    {Object.keys(onlinePeopleExclOurUser).map(userId => (
                        <Contact
                            key={userId}
                            username={onlinePeopleExclOurUser[userId]}
                            userId={userId}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            online={true}
                            setLoading={setLoading}
                            setSelectedUser={setSelectedUser}
                        />

                    ))}

                    <div className="py-2 w-full mb-2"></div>

                    {/* <h1 className="text-yellow-500 font-semibold">Offline People ({Object.keys(offlinePeople).length})</h1> */}

                    {Object.keys(offlinePeople).map(userId => (
                        <Contact
                            key={userId}
                            username={offlinePeople[userId]}
                            userId={userId}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            online={false}
                            setLoading={setLoading}
                            setSelectedUser={setSelectedUser}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}


export default MobileChatList