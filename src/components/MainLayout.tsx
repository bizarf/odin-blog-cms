import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "universal-cookie";
import { fetchUserData } from "../helper/fetchUserData";
import useUserStore from "../stores/useUserStore";

const MainLayout = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const { setUser } = useUserStore();

    useEffect(() => {
        const checkCookie = async () => {
            const jwt = await cookies.get("jwt_auth");
            if (jwt) {
                // if the server is down, then send the user back to the login page instead of leaving them on a empty page
                try {
                    const data = await fetchUserData(jwt);
                    if (data.success && data.user) {
                        setUser(data.user);
                    }
                } catch (error) {
                    console.error(error);
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        };
        checkCookie();
    }, []);

    return (
        <>
            <Header />
            {/* this flex class is to push the footer down */}
            <div className="flex-[1_0_auto]">
                {/* child elements from the router will load here */}
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
