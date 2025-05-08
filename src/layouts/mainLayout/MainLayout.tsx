import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../../components/header/Header.tsx";
import Footer from "../../components/footer/Footer.tsx";
import styles from './MainLayout.module.css'

const MainLayout: React.FC = () => {
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default MainLayout