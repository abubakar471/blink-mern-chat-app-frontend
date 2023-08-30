import { useContext } from "react"
import Contact from "./Contact"
import Avatar from "./avatar"
import Logo from "./logo"
import { UserContext } from "../contexts/UserContext"

const ChatList = ({
    onlinePeopleExclOurUser, offlinePeople,
    selectedChat, setSelectedChat,
    setSelectedUser, loading, setLoading,
    logout
}) => {
    const { state, setState } = useContext(UserContext);

    return (
        <>
            <section className={`bg-white w-1/3 
            flex flex-col md:flex lg:flex hidden
            md:h-[100%] lg:h-[100%]
            `}

            >

                <div className="flex-grow overflow-auto px-2">

                    {/* <Logo setSelectedChat={setSelectedChat} /> */}
                    <h1 className="text-pink-900 font-semibold">Onine People ({Object.keys(onlinePeopleExclOurUser).length})</h1>
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

                    <h1 className="text-pink-900 font-semibold">Offline People ({Object.keys(offlinePeople).length})</h1>

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

                <div className="p-2 text-center flex items-center 
                border border-violet-500 justify-between mix-blend-darken">
                    <span className="text-gray-600 text-sm mr-2 flex items-center">
                        <Avatar
                            online={true}
                            username={state?.user?.username} userId={state?.user?._id} />
                        <span className="ml-2">{state?.user?.username}</span>
                    </span>
                    <button
                        disabled={loading}
                        onClick={logout}
                        className='text-sm bg-violet-500 text-white
                        text-gray-400 py-1 px-2 border rounded-full ring-violet-500 ring-offset-2 ring-2'>
                        {'logout'}
                    </button>
                </div>
            </section >

        </>



    )
}

export default ChatList