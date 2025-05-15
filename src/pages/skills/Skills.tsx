import React from "react";
import styles from './Skills.module.css'
import ThemedImage from "../../components/themedImage/ThemedImage.tsx";
import checkMarkLightIcon from '../../assets/checkmark-light-icon.svg'
import checkMarkDarkIcon from '../../assets/checkmark-dark-icon.svg'

type SkillProps = {
    skill: string,
    level: string,
}

const Skill: React.FC<SkillProps> = ({skill, level}) => {
    return (
        <li className={styles.item}>
            <ThemedImage srcDark={checkMarkDarkIcon} srcLight={checkMarkLightIcon} className={styles.item__img}/>
            <div className={styles.item__text_container}>
                <p className={styles.item__skill}>{skill}</p>
                <p className={styles.item__level}>{level}</p>
            </div>
        </li>
    )
}

const Skills: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.p}>Explore My</p>
            <p className={styles.title}>Skills</p>
            <div className={styles.container}>
                <div className={styles.list}>
                    <p className={styles.list__title}>FrontEnd</p>
                    <ul className={styles.skills_container}>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                    </ul>
                </div>
                <div className={styles.list}>
                    <p className={styles.list__title}>FrontEnd</p>
                    <ul className={styles.skills_container}>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                    </ul>
                </div>
                <div className={styles.list}>
                    <p className={styles.list__title}>FrontEnd</p>
                    <ul className={styles.skills_container}>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                    </ul>
                </div>
                <div className={styles.list}>
                    <p className={styles.list__title}>FrontEnd</p>
                    <ul className={styles.skills_container}>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                        <Skill skill={"JavaScript"} level={"Basic"}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Skills;