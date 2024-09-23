import { jwtDecode } from "jwt-decode";
import JwtDecodeType from "../types/jwt_decode";

export const fetchUserData = async (jwt: string) => {
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
    return data;
};
