import api from "./axios.ts"
import {LoginFormData} from "../schemas/loginSchema.ts";

export const apiLogin = ({login,password,rememberMe}:LoginFormData) =>
    api.post("/login", {login, password, rememberMe});

export const apiLogout = () => api.post("/logout");

export const apiIsAuth = () => api.get("/isAuth");
