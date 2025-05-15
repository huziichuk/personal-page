import React, { useEffect, useState } from "react";

type Props = {
    srcLight: string;
    srcDark: string;
    alt?: string;
    className?: string;
};

const ThemedImage: React.FC<Props> = ({ srcLight, srcDark, className, alt = "" }) => {
    const getCurrentTheme = () =>
        localStorage.getItem("theme") === "dark" ? "dark" : "light";

    const [theme, setTheme] = useState<'dark' | 'light'>(getCurrentTheme());

    useEffect(() => {
        const handleThemeChange = () => {
            setTheme(getCurrentTheme());
        };

        window.addEventListener("theme-change", handleThemeChange);

        return () => {
            window.removeEventListener("theme-change", handleThemeChange);
        };
    }, []);

    return (
        <img
            src={theme === "dark" ? srcDark : srcLight}
            alt={alt}
            className={className}
        />
    );
};

export default ThemedImage;
