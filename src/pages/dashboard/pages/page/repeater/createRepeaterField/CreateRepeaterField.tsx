import styles from "./CreateRepeaterField.module.css"
import React, {useState} from "react";
import {RepeaterFieldType, typeSelectArray, TypesEnum} from "../../../../../../types/types.ts";
import CustomInput from "../../../../../../components/customInput/CustomInput.tsx";
import Button from "../../../../../../components/button/Button.tsx";
import {apiCreateRepeaterField} from "../../../../../../api/dashboard.ts";
import {AxiosError} from "axios";
import {repeaterFieldSchema} from "../../../../../../schemas/repeaterFieldSchema.ts";

type Props = {
    close: () => void;
    repeaterId: number;
    addNewRepeaterField: (repeaterField: RepeaterFieldType) => void;
}

const CreateRepeaterField:React.FC<Props> = ({close,repeaterId, addNewRepeaterField}) => {

    const [error, setError] = useState<string>("")

    const [title, setTitle] = useState<string>("")
    const [fieldKey, setFieldKey] = useState<string>("")
    const [type, setType] = useState<TypesEnum>(TypesEnum.string)
    const [value, setValue] = useState<string>("")

    const createButtonHandler = () => {
        setError("")
        const result = repeaterFieldSchema.safeParse({title, key:fieldKey, type, value, repeaterId});

        if (!result.success) {
            const firstError = result.error.errors[0]?.message;
            setError(firstError || "Validation error");
            return;
        }

        apiCreateRepeaterField(result.data).then((res) => {
            addNewRepeaterField({
                title,
                field_key:fieldKey,
                value,
                type:TypesEnum.string,
                id:res.data.id,
                repeater_id: res.data.id,
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

    return (<>
        <p className={styles.title}>Create repeater field</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputs_wrapper}>
            <CustomInput onChange={setTitle} required={true} title={"Title"} value={title}/>
            <CustomInput onChange={setFieldKey} required={true} title={"Field Key"} value={fieldKey}/>
            <CustomInput type={"select"} onChange={setType as (text:string) => void} title={"Type"} value={type} select={typeSelectArray}/>
            <CustomInput onChange={setValue} required={true} title={"Value"} value={value}/>
        </div>
        <div className={styles.buttons}>
            <Button onClick={createButtonHandler} className={styles.button} variant="primary">
                Create
            </Button>
            <Button className={styles.button} variant="secondary" onClick={close}>
                Close
            </Button>
        </div>
    </>)
}

export default CreateRepeaterField;