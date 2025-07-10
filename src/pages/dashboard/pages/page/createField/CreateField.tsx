import React, {useState} from "react";
import styles from "./CreateField.module.css"
import CustomInput from "../../../../../components/customInput/CustomInput.tsx";
import Button from "../../../../../components/button/Button.tsx";
import {FieldType, typeSelectArray, TypesEnum} from "../../../../../types/types.ts";
import {fieldSchema} from "../../../../../schemas/fieldSchema.ts";
import {apiCreateField} from "../../../../../api/dashboard.ts";
import {AxiosError} from "axios";

type Props = {
    close: () => void;
    pageId: number;
    addNewField: (field: FieldType) => void;
}

const CreateField: React.FC<Props> = ({close, pageId, addNewField}) => {

    const [error, setError] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [fieldKey, setFieldKey] = useState<string>('');
    const [type, setType] = useState<string>(TypesEnum.string);
    const [value, setValue] = useState<string>('');



    const createButtonHandler = () => {
        setError("")
        const result = fieldSchema.safeParse({title, fieldKey, type, value, pageId});

        if (!result.success) {
            const firstError = result.error.errors[0]?.message;
            setError(firstError || "Validation error");
            return;
        }

        apiCreateField(result.data).then((res) => {
            addNewField({
                title,
                field_key:fieldKey,
                value,
                type:TypesEnum.string,
                id:res.data.id,
                page_id:pageId,
            })

            setType(TypesEnum.string);
            setValue("");
            setTitle("")
            setFieldKey("")

        }).catch((e) => {
            if(e instanceof AxiosError) {
                setError(e.response?.data.message)
                return
            }
        })
    }

    return (
        <>
            <p className={styles.title}>Create field</p>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.inputs_wrapper}>
                <CustomInput onChange={setTitle} required={true} title={"Title"} value={title}/>
                <CustomInput onChange={setFieldKey} required={true} title={"Field Key"} value={fieldKey}/>
                <CustomInput type={"select"} onChange={setType} title={"Type"} value={type} select={typeSelectArray}/>
                <CustomInput type={"textarea"} onChange={setValue} required={true} title={"Value"} value={value}/>
            </div>
            <div className={styles.buttons}>
                <Button onClick={createButtonHandler} className={styles.button} variant="primary">
                    Create
                </Button>
                <Button className={styles.button} variant="secondary" onClick={close}>
                    Close
                </Button>
            </div>
        </>
    )
}

export default CreateField;