import UserType from "./user";

type JwtDecodeType = {
    exp: number;
    iat: number;
    user: UserType;
};

export default JwtDecodeType;
