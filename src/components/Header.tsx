import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import LightModeBtn from "./LightModeBtn";
import DarkModeBtn from "./DarkModeBtn";
import useUserStore from "../stores/useUserStore";
import useThemeStore from "../stores/useThemeStore";

const Header = () => {
    // import the user object and setUser function from the zustand custom hook store
    const { user, setUser } = useUserStore();

    // import the theme string and the setTheme function from the zustand custom hook store
    const { theme, setTheme } = useThemeStore();

    // on page render, check the localstorage for the theme. if it doesn't exist set it to light
    useEffect(() => {
        const pageTheme = localStorage.getItem("theme") || "light";
        setTheme(pageTheme);
    }, []);

    // whenever the theme changes, we alter the class list
    useEffect(() => {
        const handleThemeChange = () => {
            const htmlElement = document.querySelector("html");

            if (theme === "light") {
                htmlElement?.classList.remove("dark");
                localStorage.setItem("theme", "light");
            } else if (theme === "dark") {
                htmlElement?.classList.add("dark");
                localStorage.setItem("theme", "dark");
            }
        };
        handleThemeChange();
    }, [theme]);

    const cookies = new Cookies();

    const logout = () => {
        // delete the JWT token from the cookie
        setUser(undefined);
        cookies.remove("jwt_auth");
    };

    return (
        <header className="sticky top-0 z-50 flex w-full border-b-2 bg-white py-4 text-sm dark:border-b-0 dark:bg-gray-800">
            <nav className="flex w-full flex-row items-center justify-between gap-5 px-5 ">
                <Link to="/">
                    <div className="text-slate-700 text-xl dark:text-white">
                        The Blog CMS
                    </div>
                </Link>
                <div className="inline-flex">
                    {user && (
                        <>
                            <Link
                                className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                                to="/"
                            >
                                All Articles
                            </Link>
                            <Link
                                className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                                to="/new-post"
                            >
                                Create Post
                            </Link>
                            <Link
                                className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                                to="/"
                                onClick={logout}
                            >
                                Logout
                            </Link>
                        </>
                    )}
                    {/* dark mode button toggle */}
                    {theme === "light" && <LightModeBtn />}
                    {theme === "dark" && <DarkModeBtn />}
                </div>
            </nav>
        </header>
    );
};

export default Header;
