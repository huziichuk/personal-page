import React from "react";
import styles from "./AdminLayout.module.css";
import {Outlet} from "react-router-dom";
import Footer from "../../components/footer/Footer.tsx";
import AdminHeader from "../../components/adminHeader/AdminHeader.tsx";

const AdminLayout: React.FC = () => {
    return (
        <>
            <AdminHeader/>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default AdminLayout