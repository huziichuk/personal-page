import React, {useState} from "react";
import {RepeaterType} from "../../../../../types/types.ts";
import styles from "./CreateRepeater.module.css"
import CustomInput from "../../../../../components/customInput/CustomInput.tsx";
import Button from "../../../../../components/button/Button.tsx";
import {apiCreateRepeater} from "../../../../../api/dashboard.ts";
import {AxiosError} from "axios";
import {repeaterSchema} from "../../../../../schemas/repeaterSchema.ts";

type Props = {
    close: () => void;
    pageId: number;
    addNewRepeater: (field: RepeaterType) => void;
}

const CreateRepeater: React.FC<Props> = ({pageId, addNewRepeater, close}) => {

    const [key, setKey] = useState("");
    const [title, setTitle] = useState("");

    const [error, setError] = useState("");

    const createButtonHandler = () => {
        setError("")
        const result = repeaterSchema.safeParse({key, pageId, title});

        if (!result.success) {
            const firstError = result.error.errors[0]?.message;
            setError(firstError || "Validation error");
            return;
        }

        apiCreateRepeater(result.data).then((res) => {
            addNewRepeater({
                key,
                page_id:pageId,
                title,
                id:res.data.id
            })

            setKey("")

        }).catch((e) => {
            if(e instanceof AxiosError) {
                setError(e.response?.data.message)
                return
            }
        })
    }

    return <>
        <p className={styles.title}>Create repeater</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputs_wrapper}>
            <CustomInput onChange={setTitle} required={true} title={"Title"} value={title}/>
            <CustomInput onChange={setKey} required={true} title={"Key"} value={key}/>
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
}

export default CreateRepeater