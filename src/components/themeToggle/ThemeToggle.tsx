import React, {useEffect, useState} from "react";
import themeDarkIcon from '../../assets/theme_dark.png'
import themeLightIcon from '../../assets/theme_light.png'
import styles from './ThemeToggle.module.css'

const ToggleTheme:React.FC = () => {

    const getCurrentTheme = (): 'light' | 'dark' => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        return savedTheme ? savedTheme : 'light'
    }

    const [theme, setTheme] = useState<'light' | 'dark'>(getCurrentTheme());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        // Важно! Сообщаем всем компонентам о смене темы
        window.dispatchEvent(new Event("theme-change"));
        setTheme(newTheme)
    };


    return (
            <button className={styles.button} onClick={toggleTheme}>
                <img className={styles.img} src={theme === 'light' ? themeDarkIcon : themeLightIcon} alt="theme"/>
            </button>
    )
}

export default ToggleTheme