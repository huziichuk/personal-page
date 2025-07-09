import React, {JSX} from "react";
import styles from "./CustomInput.module.css"

type inputType = "text" | "textarea" | "select"

type selectType = {
    name: string,
    value: string,
}

type Props = {
    title?: string,
    value: string,
    type?: inputType,
    onChange: (text: string) => void,
    required?: boolean,
    select?: selectType[],
}



const CustomInput:React.FC<Props> = ({title="",value,onChange, required=false, type="text", select=[]}) => {

    const createInput = ():JSX.Element => {
        if (type === "text") {
            return (<input required={required} placeholder={title.toLowerCase()} value={value} onChange={(e) => onChange(e.target.value)} type="text" className={styles.input}/>)
        }
        if (type === "select"){
            if (select.length === 0) return <></>
            return (
                <select className={styles.input} value={value} onChange={(e) => onChange(e.target.value)}>
                    {select.map((s, i) => <option key={i} value={s.value}>{s.name}</option>)}
                </select>
            )
        }

        if (type === "textarea"){
            return (
                <textarea className={styles.input} value={value} onChange={(e) => onChange(e.target.value)}/>
            )
        }
        return <></>
    }

    return (
        <div className={styles.wrapper}>
            {title ? <p className={styles.title}>{title}:</p> : null}
            {createInput()}
        </div>
    )
}

export default CustomInput