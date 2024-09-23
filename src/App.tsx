import "./App.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import JwtDecodeType from "./types/jwt_decode";
import Router from "./Router";
import useUserStore from "./stores/useUserStore";

const App = () => {
    // get the setUser function from the zustand custom hook store
    const { setUser } = useUserStore();

    const cookies = new Cookies();

    const fetchUserData = async () => {
        const jwt = cookies.get("jwt_auth");
        const decode: JwtDecodeType = jwtDecode(jwt);

        const response = await fetch(
            `${import.meta.env.VITE_API_HOST}/api/user/${decode.user}`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
        if (data.success === true && data.user.isAuthor) {
            setUser(data.user);
        }
    };

    return (
        // set the app container to a minimum height 100% to allow the div to take up the rest of the space. a must have for the dark mode background colour
        <div className="flex min-h-full flex-col dark:bg-slate-600">
            <Router fetchUserData={fetchUserData} />
        </div>
    );
};

export default App;
