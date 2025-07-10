import React from "react";
import styles from './Projects.module.css'
import Button from "../../components/button/Button.tsx";
import {usePageWithFields} from "../../hooks/usePageWithFields.ts";
import Loading from "../loading/Loading.tsx";

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

    const { page, getRepeaterFieldsValue } = usePageWithFields("projects");

    if (!page) {
        return <Loading />;
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.p}>Browse My Recent</p>
            <p className={styles.title}>Projects</p>
            <div className={styles.container}>
                {getRepeaterFieldsValue("projects")?.map((project, i) => {
                    const projectJson:ProjectProps = JSON.parse(project);
                    return <Project liveLink={projectJson.liveLink} githubLink={projectJson?.githubLink} key={i} title={projectJson.title} description={projectJson.description} />
                })}
            </div>
        </div>
    )
}

export default Projects;