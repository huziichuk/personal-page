import React, {useEffect, useState} from "react";
import styles from "./Login.module.css";
import Button from "../../components/button/Button.tsx";
import {loginSchema} from "../../schemas/loginSchema.ts";
import {apiLogin} from "../../api/auth.ts";
import {AxiosError} from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";

const Login:React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const isAuth = useAuth()

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleLoginChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 100) return
        setLogin(e.target.value);
    }

    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 100) return
        setPassword(e.target.value);
    }

    const handleRememberMeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    }

    const onSubmit = async () => {
        setError("")

        const result = loginSchema.safeParse({ login, password, rememberMe });

        if (!result.success) {
            const firstError = result.error.errors[0]?.message;
            setError(firstError || "Validation error");
            return;
        }


        try {
            await apiLogin(result.data);
            navigate("/admin");
        } catch (error) {
            if(error instanceof AxiosError) {
                if (error.response && error.response.status === 401) {
                    setError("Invalid login or password")
                    return;
                }
                setError("Some error occurred, please try again later");
                return;
            }
            setError("Fatal error");
        }
    }


    useEffect(() => {
        if (isAuth) {
            navigate("/admin");
        }
    })
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className={styles.title}>Login</p>
                {error ? <p className={styles.error}>{error}</p> : null}
                <input value={login} onChange={handleLoginChange} placeholder="Enter your login" className={styles.input} type="text"/>
                <input value={password} onChange={handlePasswordChange} placeholder="Enter your password" className={styles.input} type="password"/>
                <div>
                    <input onChange={handleRememberMeChange} checked={rememberMe} className={styles.checkbox} id="checkbox" type="checkbox"/>
                    <label className={styles.label} htmlFor="checkbox">Remember Me</label>
                </div>
                <Button onClick={onSubmit} className={styles.button} variant="primary">Log In</Button>
            </div>
        </div>
    )
}

export default Login