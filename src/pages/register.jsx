import axios from "axios";
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import Logo from "../components/logo";
import { UserContext } from "../contexts/UserContext";

const Register = () => {
    const navigate = useNavigate();
    const {state, setState} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post('/auth/register', {
                username: username,
                password: password
            });

            if (data.ok) {
                toast("User has been created", {
                    icon: "✔"
                });
                navigate("/login");
            }

        } catch (error) {
            if (error && error.response) {
                toast(error.response.data, {
                    icon: "❌"
                });
            } else {
                console.log(error);
            }
        } finally {
            setUsername('');
            setPassword('');
            setLoading(false);
        }
    }

    if (state && state.token) {
        navigate("/chat");
    }


    return (
        <div>
            <div className="h-[60vh] md:h-screen lg:h-screen flex flex-col justify-center items-center">
            <h1 className="text-blue-500 text-lg mb-2">
                <Logo />
            </h1>
                <form className="w-64 mb-12 mx-auto" onSubmit={submitHandler}>
                    <input value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" placeholder="username" className="block w-full 
                rounded-sm p-2 mb-2 border" required />
                    <input value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="text" placeholder="password" className="block w-full 
                rounded-sm p-2 mb-2 border" required />
                    <button disabled={loading} className="bg-blue-500 block w-full 
                rounded-sm text-white p-2">
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <Link to="/login" className="font-semibold text-sm text-gray-400">
                    <p>Already have an account | Login instead</p>
                </Link>
            </div>
        </div>
    )
}

export default Register