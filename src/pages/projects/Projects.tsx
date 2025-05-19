import React from "react";
import styles from './Projects.module.css'
import Button from "../../components/button/Button.tsx";

type ProjectProps = {
    title: string;
    description: string;
    githubLink?: string;
    liveLink?: string;
}

const Project: React.FC<ProjectProps> = ({title,description,githubLink,liveLink}) => {
    return(
        <div className={styles.item}>
            <p className={styles.item__title}>{title}</p>
            <div className={styles.item__description}>{description}</div>
            <div className={styles.button__wrapper}>
                {githubLink && (
                    <a href={githubLink}>
                        <Button>Github</Button>
                    </a>
                )}
                {liveLink && (
                    <a href={liveLink}>
                        <Button>Live</Button>
                    </a>
                )}
            </div>
        </div>
    )
}

const Projects: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.p}>Browse My Recent</p>
            <p className={styles.title}>Projects</p>
            <div className={styles.container}>
                <Project description={"lorem1fdsfdsfsdfsdfds0"} title={"Project One"} githubLink={"fdsfsdf"}/>
                <Project description={"lorem1fdsfdsfsdfsdfds0"} title={"Project One"} githubLink={"fdsfsdf"}/>
                <Project description={"lorem1fdsfdsfsdfsdfds0lorem1fdsfdsfsdfsdfds0lorem1fdsfdsfsdfsdfds0lorem1fdsfdsfsdfsdfds0lorem1fdsfdsfsdfsdfds0lorem1fdsfdsfsdfsdfds0"} title={"Project One"} githubLink={"fdsfsdf"}/>
                <Project description={"lorem1fdsfdsfsdfsdfds0"} title={"Project One"} githubLink={"fdsfsdf"}/>
                <Project description={"lorem1fdsfdsfsdfsdfds0"} title={"Project One"} githubLink={"fdsfsdf"}/>
                <Project description={"lorem1fdsfdsfsdfsdfds0"} title={"Project One"} githubLink={"fdsfsdf"}/>
                <Project description={"lorem1fdsfdsfsdfsdfds0"} title={"Project One"} liveLink={"fdsf"} githubLink={"fdsfsdf"}/>
            </div>
        </div>
    )
}

export default Projects;