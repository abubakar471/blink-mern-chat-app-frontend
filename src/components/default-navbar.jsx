import { NavLink } from "react-router-dom"
import Logo from "./logo"

const DefaultNavbar = () => {
    return (
        <div style={{ Index: "5555" }} className="p-4 border-b">
            <nav className="flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-4 md:gap-2 lg:gap-2 md:pr-10">
                    <NavLink className="border-b-2 border-t-2 border-violet-500 
                    hover:bg-violet-500 hover:text-white rounded-lg p-1 transition-all ease-in" 
                    to="/register">Register</NavLink>
                    <NavLink className="border-b-2 border-t-2 border-violet-500 
                    hover:bg-violet-500 hover:text-white rounded-lg p-1 transition-all ease-in" 
                    to="/login">Log in</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default DefaultNavbar