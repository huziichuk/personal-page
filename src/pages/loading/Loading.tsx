import React, {useEffect, useState} from "react";
import styles from "./Loading.module.css";

const Loading: React.FC = () => {

    const [dots, setDots] = useState("")

    useEffect(() => {
        const interval = setInterval(() =>{
            setDots((prevDots) => {
                if (prevDots === "..."){
                    return ""
                }
                return prevDots + ".";
            })
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    })

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Loading{dots}</p>
        </div>
    )
}

export default Loading