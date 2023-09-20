import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserType from "../types/user";
import Cookies from "universal-cookie";

type Props = {
    user: UserType | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
    theme: string | undefined;
    setTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
    fetchUserData: () => void;
};

const MainLayout = ({
    user,
    setUser,
    theme,
    setTheme,
    fetchUserData,
}: Props) => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookie = async () => {
            const jwt = await cookies.get("jwt_auth");
            if (jwt) {
                fetchUserData();
            } else {
                navigate("/");
            }
        };
        checkCookie();
    }, []);

    return (
        <>
            <Header
                user={user}
                setUser={setUser}
                theme={theme}
                setTheme={setTheme}
            />
            {/* this flex class is to push the footer down */}
            <div className="flex-[1_0_auto]">
                {/* child elements from the router will load here */}
                <Outlet />
            </div>
            <Footer theme={theme} />
        </>
    );
};

export default MainLayout;
