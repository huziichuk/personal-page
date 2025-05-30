import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styles from "./Header.module.css";
import ThemeToggle from "../themeToggle/ThemeToggle.tsx";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    useEffect(() => {
        if (isOpen) {
            window.scrollTo(0, 0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/" onClick={closeMenu}>Nazar Huziichuk</Link>
                </div>

                <button
                    className={`${styles.burger} ${isOpen ? styles.open : ""}`}
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </button>

                <ul className={`${styles.links} ${isOpen ? styles.linksOpen : ""}`}>
                    <li><Link className={`${styles.link} underline_on_hover`} to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link className={`${styles.link} underline_on_hover`} to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link className={`${styles.link} underline_on_hover`} to="/skills" onClick={closeMenu}>Skills</Link></li>
                    <li><Link className={`${styles.link} underline_on_hover`} to="/projects" onClick={closeMenu}>Projects</Link></li>
                    <li><Link className={`${styles.link} underline_on_hover`} to="/contact" onClick={closeMenu}>Contact</Link></li>
                    <li><ThemeToggle/></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
