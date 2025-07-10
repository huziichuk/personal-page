import React, {useState} from "react";
import {RepeaterFieldType, typeSelectArray, TypesEnum} from "../../../../../../types/types.ts";
import styles from "./RepeaterField.module.css";
import CustomInput from "../../../../../../components/customInput/CustomInput.tsx";
import Button from "../../../../../../components/button/Button.tsx";
import { apiUpdateRepeaterField} from "../../../../../../api/dashboard.ts";
import {AxiosError} from "axios";
import {repeaterFieldSchema} from "../../../../../../schemas/repeaterFieldSchema.ts";

type Props = {
    repeaterField: RepeaterFieldType;
}

const RepeaterField:React.FC<Props> = ({repeaterField}) => {

    const [error, setError] = useState<string>("");
    const [isChanged , setIsChanged] = useState<boolean>(false);

    const [fieldKey, setFieldKey] = useState<string>(repeaterField.key);
    const [title, setTitle] = useState<string>(repeaterField.title);
    const [value, setValue] = useState<string>(repeaterField.value);
    const [type, setType] = useState<TypesEnum>(TypesEnum.string);

    console.log("repeaterField", repeaterField);

    const fieldKeyChangeHandler = (newValue:string) => {
        setFieldKey(newValue);
        setIsChanged(true);
    }

    const typeChangeHandler = (newValue:TypesEnum) => {
        setType(newValue);
        setIsChanged(true);
    }

    const valueChangeHandler = (newValue:string) => {
        setValue(newValue);
        setIsChanged(true);
    }

    const titleChangeHandler = (newValue:string) => {
        setTitle(newValue);
        setIsChanged(true);
    }


    const clearHandler = () => {
        setIsChanged(false);
        setFieldKey(repeaterField.key);
        setType(repeaterField.type);
        setValue(repeaterField.value);
    }

    const updateButtonHandler = () => {
        setError("");
        const result = repeaterFieldSchema.safeParse({key:fieldKey, id:repeaterField.id, value, type, title});

        if (!result.success) {
            const firstError = result.error.errors[0]?.message;
            setError(firstError || "Validation error");
            return;
        }

        apiUpdateRepeaterField(result.data).then(() => {
            setIsChanged(false);
        }).catch(e => {
            if(e instanceof AxiosError) {
                setError(e.response?.data.message)
                return;
            }
            setError("Something went wrong");
        })
    }

    return (<div className={styles.wrapper}>
        <p className={styles.title}>ID: {repeaterField.id}</p>
        {error ? <p className={styles.error}>{error}</p> : null}
        <div className={styles.content}>
            <CustomInput onChange={titleChangeHandler} title={"Title"} value={title}/>
            <CustomInput onChange={fieldKeyChangeHandler} title={"Field key"} value={fieldKey}/>
            <CustomInput type={"select"} onChange={typeChangeHandler as (text: string) => void} title={"Type"} value={type} select={typeSelectArray}/>
            <CustomInput type={"textarea"} onChange={valueChangeHandler} title={"Value"} value={value}/>
        </div>
        {isChanged && <div className={styles.buttons}>
            <Button onClick={updateButtonHandler} className={styles.button} variant="primary">
                Update
            </Button>
            <Button onClick={clearHandler} className={styles.button} variant="secondary">
                Clear
            </Button>
        </div>}
    </div>)
}

export default RepeaterField;