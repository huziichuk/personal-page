import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/" onClick={closeMenu}>Huziichuk Nazar</Link>
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
                    <li><Link className={styles.link} to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link className={styles.link} to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link className={styles.link} to="/experience" onClick={closeMenu}>Experience</Link></li>
                    <li><Link className={styles.link} to="/projects" onClick={closeMenu}>Projects</Link></li>
                    <li><Link className={styles.link} to="/contact" onClick={closeMenu}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
