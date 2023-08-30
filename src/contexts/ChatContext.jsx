import { createContext, useEffect, useState } from "react"
import axios from "axios";
export const ChatContext = createContext({});

export const ChatContextProvider = ({ children }) => {
    const [chatNow, setChatNow] = useState("");

    useEffect(() => {
        setChatNow(JSON.parse(window.localStorage.getItem("chat")));
    }, []);

    // useEffect(() => {
    //     setChatNow(JSON.parse(window.localStorage.getItem("chat")));
    // }, [chatNow])

    return (
        <ChatContext.Provider value={{ chatNow, setChatNow }}>
            {children}
        </ChatContext.Provider>
    )
}