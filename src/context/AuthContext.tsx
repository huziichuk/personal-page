import React, { createContext, useState, useEffect } from "react";
import {apiIsAuth} from "../api/auth.ts";

export type AuthContextType = {
    isAuth: boolean | null;
    setIsAuth: (auth: boolean | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await apiIsAuth();
                setIsAuth(true);
            } catch {
                setIsAuth(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext}
