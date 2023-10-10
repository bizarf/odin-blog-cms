import { create } from "zustand";
import UserType from "../types/user";

// type definition for the store
interface UserState {
    user: UserType | undefined;
    setUser: (user: UserType | undefined) => void;
}

// custom hook made with Zustand to store the user state and setUser function
const useUserStore = create<UserState>((set) => ({
    user: undefined,
    setUser: (user) => set({ user }),
}));

export default useUserStore;
