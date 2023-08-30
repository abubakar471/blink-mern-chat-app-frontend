import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

const Logo = () => {
    const { state } = useContext(UserContext);

    return (
        <div className="flex items-center 
        p-1 gap-2 cursor-pointer">
            <Link
            className="flex items-center"
                to={state ? '/chat' : "/"}
            >
                <img src="/assets/logo3.png" alt="logo"
                    loading="lazy" className="w-8 h-8"
                />
                <h3 className="text-violet-700 font-bold">blink<span
                    className="text-pink-700">.inc</span></h3>
            </Link>
        </div>

    )
}

export default Logo