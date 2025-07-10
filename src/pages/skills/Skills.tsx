import React from "react";
import styles from './Skills.module.css'
import ThemedImage from "../../components/themedImage/ThemedImage.tsx";
import checkMarkLightIcon from '../../assets/checkmark-light-icon.svg'
import checkMarkDarkIcon from '../../assets/checkmark-dark-icon.svg'
import {usePageWithFields} from "../../hooks/usePageWithFields.ts";
import Loading from "../loading/Loading.tsx";

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

    const { page, getRepeaterFieldsValue } = usePageWithFields("skills");

    if (!page) {
        return <Loading />;
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.p}>Explore My</p>
            <p className={styles.title}>Skills</p>
            <div className={styles.container}>
                <div className={styles.list}>
                    <p className={styles.list__title}>FrontEnd</p>
                    <ul className={styles.skills_container}>
                        {getRepeaterFieldsValue("skills__frontend")?.map((skill, index) => {
                            const skillArray = skill.split("|");
                            return <Skill key={index} skill={skillArray[0]} level={skillArray[1]} />
                        })}
                    </ul>
                </div>
                <div className={styles.list}>
                    <p className={styles.list__title}>BackEnd</p>
                    <ul className={styles.skills_container}>
                        {getRepeaterFieldsValue("skills__backend")?.map((skill, index) => {
                            const skillArray = skill.split("|");
                            return <Skill key={index} skill={skillArray[0]} level={skillArray[1]} />
                        })}
                    </ul>
                </div>
                <div className={styles.list}>
                    <p className={styles.list__title}>DevOps / Tools</p>
                    <ul className={styles.skills_container}>
                        {getRepeaterFieldsValue("skills__tools")?.map((skill, index) => {
                            const skillArray = skill.split("|");
                            return <Skill key={index} skill={skillArray[0]} level={skillArray[1]} />
                        })}
                    </ul>
                </div>
                <div className={styles.list}>
                    <p className={styles.list__title}>Other Skills</p>
                    <ul className={styles.skills_container}>
                        {getRepeaterFieldsValue("skills__other")?.map((skill, index) => {
                            const skillArray = skill.split("|");
                            return <Skill key={index} skill={skillArray[0]} level={skillArray[1]} />
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Skills;