import "./App.css";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import JwtDecodeType from "./types/jwt_decode";
import Router from "./Router";
import useUserStore from "./stores/useUserStore";

const App = () => {
    // get the setUser function from the zustand custom hook store
    const { setUser } = useUserStore();

    const cookies = new Cookies();

    const fetchUserData = () => {
        const jwt = cookies.get("jwt_auth");
        const decode: JwtDecodeType = jwtDecode(jwt);

        fetch(
            `https://odin-blog-api-ofv2.onrender.com/api/user/${decode.user}`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    setUser(data.user);
                }
            });
    };

    return (
        // set the app container to a minimum height 100% to allow the div to take up the rest of the space. a must have for the dark mode background colour
        <div className="flex min-h-full flex-col dark:bg-slate-600">
            <Router fetchUserData={fetchUserData} />
        </div>
    );
};

export default App;
