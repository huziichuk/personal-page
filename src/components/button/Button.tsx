import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    className?: string;
};

const Button: React.FC<ButtonProps> = ({children, onClick, type = "button", variant = "primary", className}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={clsx(styles.button, styles[variant], className)}
        >
            {children}
        </button>
    );
};

export default Button;
