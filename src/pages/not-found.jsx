import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

const NotFound = () => {
    const {state} = useContext(UserContext);

    return(
        <div className="bg-white h-[100vh] flex items-center justify-center flex-col">
            <div>
                <h1 style={{fontSize : "30px"}}>404 Not Found!</h1>
                <Link to={state ? "/chat" : "/"} className="bg-violet-500 text-white p-2">Go to homepage</Link>
            </div>
        </div>
    )
}

export default NotFound