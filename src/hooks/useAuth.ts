import { useContext } from "react";
import {AuthContext} from "../context/AuthContext.tsx";

export const useAuth = (): boolean | null | undefined => {
    return useContext(AuthContext)?.isAuth;
};

export default useAuth;