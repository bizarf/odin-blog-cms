import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "universal-cookie";

type Props = {
    fetchUserData: () => void;
};

const MainLayout = ({ fetchUserData }: Props) => {
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
