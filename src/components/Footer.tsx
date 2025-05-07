import styles from './Footer.module.css'
import React from "react";

const Footer: React.FC = () => {
    return(
        <footer className={styles.wrapper}>
            <span className={styles.text}>Copyright © 2023 Huziichuk Nazar. All Rights Reserved.</span>
        </footer>
    )
}

export default Footer