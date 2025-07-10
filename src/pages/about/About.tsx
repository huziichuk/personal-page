import React from "react";
import styles from "./About.module.css";
import ThemedImage from "../../components/themedImage/ThemedImage.tsx";
import educationLightIcon from '../../assets/education-light-icon.svg'
import educationDarkIcon from '../../assets/education-dark-icon.svg'
import completeDarkIcon from '../../assets/complete-dark-icon.svg'
import completeLightIcon from '../../assets/complete-light-icon.svg'
import Loading from "../loading/Loading.tsx";
import {usePageWithFields} from "../../hooks/usePageWithFields.ts";

const About: React.FC = () => {

    const { page, getFieldValue } = usePageWithFields("about");

    if (!page) {
        return <Loading />;
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.p}>Get To Know More</p>
            <p className={styles.title}>About Me</p>
            <div className={styles.blocks_container}>
                <div className={styles.block}>
                    <ThemedImage className={styles.block__img} srcDark={educationDarkIcon} srcLight={educationLightIcon} />
                    <p className={styles.block__title}>Education</p>
                    <p className={styles.block__text}>{getFieldValue("about__education_title")}</p>
                    <p className={styles.block__text}>{getFieldValue("about__education_desc")}</p>
                </div>
                <div className={styles.block}>
                    <ThemedImage className={styles.block__img} srcDark={completeDarkIcon} srcLight={completeLightIcon} />
                    <p className={styles.block__title}>Experience</p>
                    <p className={styles.block__text}>{getFieldValue("about__experience_title")}</p>
                    <p className={styles.block__text}>{getFieldValue("about__experience_desc")}</p>
                </div>
            </div>
            <div className={styles.description}>{getFieldValue("about__desc")}</div>
        </div>
    )
}
export default About