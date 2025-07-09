import React from "react";
import styles from "./AdminHeader.module.css"
import {Link, useNavigate} from "react-router-dom";
import ThemeToggle from "../themeToggle/ThemeToggle.tsx";
import logoutDarkIcon from "../../assets/logout-dark.svg"
import logoutLightIcon from "../../assets/logout-light.svg"
import ThemedImage from "../themedImage/ThemedImage.tsx";
import {apiLogout} from "../../api/auth.ts";

const AdminHeader: React.FC = () => {
    const navigate = useNavigate();
    const logoutButtonHandler = () => {
        apiLogout().then(() => {
            navigate("/");
        }).catch(() => {
            navigate("/admin/login");
        })
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">Nazar Huziichuk</Link>
            </div>
            <h1 className={styles.title}>Admin Panel</h1>
            <div className={styles.nav}>
                <ThemeToggle/>
                <button className={styles.button} onClick={logoutButtonHandler}>
                    <ThemedImage className={styles.icon} srcDark={logoutDarkIcon} srcLight={logoutLightIcon}/>
                </button>
            </div>
        </header>
    )
}

export default AdminHeader