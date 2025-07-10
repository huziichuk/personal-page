import * as React from "react";
import styles from "./Home.module.css";
import me from '../../assets/me.jpg'
import Button from "../../components/button/Button.tsx";
import {Link} from "react-router-dom";
import Loading from "../loading/Loading.tsx";
import {usePageWithFields} from "../../hooks/usePageWithFields.ts";

const Home:React.FC = ()=> {

    const { page, getFieldValue } = usePageWithFields("home");

    if (!page) {
        return <Loading />;
    }
    
    return(
        <div className={styles.wrapper}>
            <div className={styles.img_container}>
                <img className={styles.img} src={me} alt="me"/>
            </div>
            <div className={styles.text_container}>
                <p className={styles.text__p1}>{getFieldValue("home__title")}</p>
                <h1 className={styles.text__title}>{getFieldValue("home__name")}</h1>
                <p className={styles.text__p2}>{getFieldValue("home__position")}</p>
                <div className={styles.btb_container}>
                    <Button>Download CV</Button>
                    <Link to={"/contact"}><Button variant="secondary">Contact Info</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home