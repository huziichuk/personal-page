import React from "react";
import styles from "./AdminLayout.module.css";
import {Outlet} from "react-router-dom";

const AdminLayout: React.FC = () => {
    return (
        <main className={styles.main}>
            <Outlet/>
        </main>
    )
}

export default AdminLayout