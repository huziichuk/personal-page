import React from "react";
import styles from "./ContactLink.module.css";
import ThemedImage from "../../../components/themedImage/ThemedImage.tsx";

type Props = {
    link: string,
    srcDark?: string,
    srcLight: string,
    text: string,
}

const ContactLink: React.FC<Props> = ({link, srcLight, srcDark=srcLight, text}) => {
    return (
        <li className={styles.item}>
            <ThemedImage className={styles.img} srcDark={srcDark} srcLight={srcLight}/>
            <a className="underline_on_hover" href={link}>{text}</a>
        </li>
    )
}

export default ContactLink