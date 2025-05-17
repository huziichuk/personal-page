import React from "react";
import styles from "../contact/Contact.module.css";
import ThemedImage from "../../components/themedImage/ThemedImage.tsx";
import educationLightIcon from '../../assets/education-light-icon.svg'
import educationDarkIcon from '../../assets/education-dark-icon.svg'
import completeDarkIcon from '../../assets/complete-dark-icon.svg'
import completeLightIcon from '../../assets/complete-light-icon.svg'

const About: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.p}>Get To Know More</p>
            <p className={styles.title}>About Me</p>
            <div className={styles.blocks_container}>
                <div className={styles.block}>
                    <ThemedImage className={styles.block__img} srcDark={educationDarkIcon} srcLight={educationLightIcon} />
                    <p className={styles.block__title}>Education</p>
                    <p className={styles.block__text}>Vocational Qualification in ICT</p>
                    <p className={styles.block__text}>Salon Seudun Ammattiopisto, Finland</p>
                </div>
                <div className={styles.block}>
                    <ThemedImage className={styles.block__img} srcDark={completeDarkIcon} srcLight={completeLightIcon} />
                    <p className={styles.block__title}>Experience</p>
                    <p className={styles.block__text}>1+ years of development</p>
                    <p className={styles.block__text}>React, Redux, Express, ARK ASM</p>
                </div>
            </div>
            <div className={styles.description}>Hi! I'm Nazar, a passionate web developer with a strong interest in building beautiful and functional websites. I’ve been coding for over a year, working mostly with JavaScript, React, Node.js, and PostgreSQL. I enjoy learning new technologies, solving real-world problems, and turning ideas into working projects. I was also one of the co-owners of a large ARK server where I developed custom tools and features to improve the player experience. Right now, I’m focused on improving my skills in full-stack development and building projects that I can be proud of. When I’m not coding, I like going for walks, drinking coffee, and exploring creative ideas. Let’s build something great together!</div>
        </div>
    )
}
export default About