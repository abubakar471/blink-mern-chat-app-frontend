import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios"
import toast from "react-hot-toast"
import { Link, NavLink, useNavigate } from "react-router-dom";
import DefaultNavbar from "../components/default-navbar";
import Logo from "../components/logo";
import { Card } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    const { state, setState } = useContext(UserContext);
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

    useEffect(() => {
        if (state && state.token) {
            navigate("/chat");
        }
    }, [state && state.token])

    return (
        <div className="bg-white overflow-hidden">
            <DefaultNavbar />
            <header
                style={{
                    backgroundImage: "url('/assets/hero1.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "flex-end",
                    alignItems: "self-end",
                    justifyContent: "left"
                }}
                className="w-[100vw] hidden md:block lg:block h-[0vh] md:h-[90vh] lg:h-[90vh]"
            >

                <div className="hidden md:flex lg:flex
                bg-white w-[40%] h-[500px] flex-col 
                items-center justify-center">
                    <div className="flex items-center"><Logo /></div>
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
            </header>

            {/* mobile view header */}
            <header
                style={{
                    backgroundImage: "url('/assets/about.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "flex-end",
                    alignItems: "self-end",
                    justifyContent: "left"
                }}
                className="flex items-center justify-center md:hidden lg:hidden h-[50vh]">
                <div className="bg-white w-[250px] h-[300px] m-auto 
                flex flex-col items-center justify-center  rounded-md md:rounded-md lg:rounded-md">

                    <h1 style={{ fontSize: "28px" }} className="text-violet-500">Blink Inc</h1>
                    <p className="text-gray-500 text-md p-2 text-center">
                        Connect with your dear ones with blink.inc.
                        Real-time chat app with authentication. Included many exciting
                        features like photos, videos and file sharing.
                    </p>
                    <NavLink to="/register" className="bg-violet-500 text-white rounded-md p-2">
                        Get Started
                    </NavLink>
                </div>
            </header>
            {/* about section */}
            <section>
                <h1 style={{
                    width: "max-content"
                }} className="text-center text-xl mx-auto p-4">
                    <p className="underline pb-2">About</p>
                </h1>

                <div className="flex justify-center md:justify-evenly lg:justify-evenly  w-[80%] mx-auto">
                    <div className="w-2/3 hidden md:block lg:block">
                        <img
                            className="w-[100%] h-68 "
                            src="/assets/hero.png"
                            alt="about"
                        />
                    </div>

                    <div className="w-full md:w-1/3 lg:w-1/3">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Facilis commodi aspernatur
                            accusamus hic porro unde nihil culpa dignissimos
                            perferendis iste eum excepturi soluta voluptatum
                            quae rem quas, quidem assumenda omnis?
                            Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Facilis commodi aspernatur
                            accusamus hic porro unde nihil culpa dignissimos
                            perferendis iste eum excepturi soluta voluptatum
                            quae rem quas, quidem assumenda omnis?
                            Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Facilis commodi aspernatur
                            accusamus hic porro unde nihil culpa dignissimos
                            perferendis iste eum excepturi soluta voluptatum
                            quae rem quas, quidem assumenda omnis?
                        </p>
                    </div>
                </div>
            </section>

            {/* review section */}

            <section className="w-[95%] mx-auto">
                <h1 style={{ fontSize: "24px" }} className="text-xl text-center 
                p-4 mt-4 underline">Reviews</h1>

                <div className="flex items-center flex-col md:flex-row lg:flex-row">
                    <Card

                        className="mb-10 w-[100%] md:w-1/4 lg:w-1/4 
                        flex flex-col items-center 
                                    justify-center p-2 mx-2">
                        <img
                            className="w-20 h-20 rounded-full"
                            src="/assets/big_smoke.jpg"
                            alt="big_smoke" />
                        <h1>Big Smoke</h1>
                        <p className="px-4">
                            Really a great app to try on. Looks great 👍
                        </p>
                    </Card>

                    <Card

                        className="mb-10 w-[100%] md:w-1/4 lg:w-1/4
                        flex flex-col items-center 
                                    justify-center p-2 mx-2">
                        <img
                            className="w-20 h-20 rounded-full"
                            src="/assets/ryder.jpg"
                            alt="ryder" />
                        <h1>Ryder</h1>
                        <p className="px-4">
                            Really a great app to try on. Looks great 👍
                        </p>
                    </Card>

                    <Card

                        className="mb-10 w-[100%] md:w-1/4 lg:w-1/4
                        flex flex-col items-center 
                                    justify-center p-2 mx-2">
                        <img
                            className="w-20 h-20 rounded-full"
                            src="/assets/cj.jpg"
                            alt="carl_johnson" />
                        <h1>CJ</h1>
                        <p className="px-4">
                            Really a great app to try on. Looks great 👍
                        </p>
                    </Card>

                    <Card

                        className="mb-10 w-[100%] md:w-1/4 lg:w-1/4
                        flex flex-col items-center 
                                    justify-center p-2 mx-2">
                        <img
                            className="w-20 h-20 rounded-full"
                            src="/assets/og_loc.jpg"
                            alt="og_loc" />
                        <h1>Og Loc</h1>
                        <p className="px-4">
                            Really a great app to try on. Looks great 👍
                        </p>
                    </Card>
                </div>
            </section>

            <footer className="m-10 h-[400px] md:h-[auto] lg:h-[auto]">
                <div className="w-[90%] md:w-[80%] lg:w-[80%] mx-auto flex flex-col 
                md:flex-row lg:flex-row items-center justify-between">
                    <p>&copy;Copyright 2023 | Blink Inc</p>
                    <a href="mailto:abdurjoy2001@gmail.com">abdurjoy2001@gmail.com</a>
                    <p>developed by AB DEVS</p>
                </div>
            </footer>
        </div>
    )
}

export default Home