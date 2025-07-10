import React, {useState} from "react";
import {FieldType, typeSelectArray, TypesEnum} from "../../../../../types/types.ts";
import styles from "./Field.module.css"
import Button from "../../../../../components/button/Button.tsx";
import {fieldSchema} from "../../../../../schemas/fieldSchema.ts";
import {apiUpdateField} from "../../../../../api/dashboard.ts";
import {AxiosError} from "axios";
import CustomInput from "../../../../../components/customInput/CustomInput.tsx";

type Props = {
    field:FieldType
}

const Field: React.FC<Props> = ({field}) => {

    const [isChanged , setIsChanged] = useState<boolean>(false);

    const [title, setTitle] = useState<string>(field.title);
    const [fieldKey, setFieldKey] = useState<string>(field.field_key);
    const [type, setType] = useState<TypesEnum>(TypesEnum.string);
    const [value, setValue] = useState<string>(field.value);

    const [error, setError] = useState<string>("");

    const clearHandler = () => {
        setIsChanged(false);
        setTitle(field.title);
        setFieldKey(field.field_key);
        setType(field.type);
        setValue(field.value);
    }

    const titleChangeHandler = (newValue:string) => {
        setTitle(newValue);
        setIsChanged(true);
    }

    const fieldKeyChangeHandler = (newValue:string) => {
        setFieldKey(newValue);
        setIsChanged(true);
    }

    const valueChangeHandler = (newValue:string) => {
        setValue(newValue);
        setIsChanged(true);
    }

    const typeChangeHandler = (newValue:TypesEnum) => {
        setType(newValue);
        setIsChanged(true);
    }



    const updateButtonHandler = () => {
        setError("");
        const result = fieldSchema.safeParse({title, fieldKey, id:field.id, value, type, pageId:field.page_id});

        if (!result.success) {
            const firstError = result.error.errors[0]?.message;
            setError(firstError || "Validation error");
            return;
        }

        apiUpdateField(result.data).then(() => {
            setIsChanged(false);
        }).catch(e => {
            if(e instanceof AxiosError) {
                setError(e.response?.data.message)
                return;
            }
            setError("Something went wrong");
        })
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>ID: {field.id}</p>
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
        </div>
    )
}

export default Field;