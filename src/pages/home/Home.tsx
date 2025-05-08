import * as React from "react";
import styles from "./Home.module.css";
import me from '../../assets/me.jpg'
import Button from "../../components/button/Button.tsx";
import {Link} from "react-router-dom";

const Home:React.FC = ()=> {
    return(
        <div className={styles.wrapper}>
            <div className={styles.img_container}>
                <img className={styles.img} src={me} alt="me"/>
            </div>
            <div className={styles.text_container}>
                <p className={styles.text__p1}>Hello, I'm</p>
                <h1 className={styles.text__title}>Nazar Huziichuk</h1>
                <p className={styles.text__p2}>Frontend Developer</p>
                <div className={styles.btb_container}>
                    <Button>Download CV</Button>
                    <Link to={"/contact"}><Button variant="secondary">Contact Info</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home