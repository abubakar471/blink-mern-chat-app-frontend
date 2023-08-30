import { createContext, useEffect, useState } from "react"
import axios from "axios";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [state, setState] = useState({
        user: {},
        token: "",
    });

    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("user")));
    }, []);

    const token = (state && state.token) ? state.token : "";

    axios.defaults.baseURL = import.meta.env.VITE_BLINK_PUBLIC_API;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            let res = error.response;
            if (res.status === (401 || 403) && res.config && !res.config.__isRetryRequest) {
                setState(null);
                window.localStorage.removeItem("user");
                return Promise.reject(error)
            }else{
                return Promise.reject(error)
            }
        }
    )

    return (
        <UserContext.Provider value={{ state, setState }}>
            {children}
        </UserContext.Provider>
    )
}