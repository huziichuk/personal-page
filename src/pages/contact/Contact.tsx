import React from "react";
import styles from './Contact.module.css'
import ContactLink from "./contactLink/ContactLink.tsx";
import emailIcon from "../../assets/email-icon.svg"
import telegramIcon from "../../assets/telegram-icon.svg"
import githubLightIcon from "../../assets/github-light-icon.svg"
import githubDarkIcon from "../../assets/github-dark-icon.svg"

const Contact:React.FC = () =>{
    return (
        <div className={styles.wrapper}>
            <p className={styles.p}>Get in Touch</p>
            <p className={styles.title}>Contact Me</p>
            <ul className={styles.contact_list}>
                <ContactLink link={"mailto:nazar.huziichuk@gmail.com"} srcLight={emailIcon} text={"nazar.huziichuk@gmail.com"}/>
                <ContactLink link={"https://t.me/guziiuchyk"} srcLight={telegramIcon} text={"Telegram"}/>
                <ContactLink link={"https://github.com/huziichuk"} srcLight={githubLightIcon} srcDark={githubDarkIcon} text={"Github"}/>
            </ul>
        </div>
    )
}

export default Contact