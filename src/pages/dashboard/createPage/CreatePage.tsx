import React, {useState} from "react";
import styles from './CreatePage.module.css'
import CustomInput from "../../../components/customInput/CustomInput.tsx";
import Button from "../../../components/button/Button.tsx";
import {apiCreatePage} from "../../../api/dashboard.ts";
import {pageSchema} from "../../../schemas/pageSchema.ts";
import {AxiosError} from "axios";

type Props = {
    close: () => void;
}

const CreatePage: React.FC<Props> = ({close}) => {

    const [title, setTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [error, setError] = useState<string>('');

    const createButtonHandler = () => {
        setError("")
        const result = pageSchema.safeParse({title, slug});

        if (!result.success) {
            const firstError = result.error.errors[0]?.message;
            setError(firstError || "Validation error");
            return;
        }

        apiCreatePage(result.data).then(() => {
            close()
        }).catch(error => {
           if (error instanceof AxiosError) {
               setError(error.response?.data?.message);
               return;
           }
           setError("Internal Server Error");
        })
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Create page</p>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.inputs_wrapper}>
                <CustomInput onChange={setTitle} required={true} title={"Title"} value={title}/>
                <CustomInput onChange={setSlug} required={true} title={"Slug"} value={slug}/>
            </div>
            <div className={styles.buttons}>
                <Button className={styles.button} variant="primary" onClick={createButtonHandler}>
                    Create
                </Button>
                <Button className={styles.button} variant="secondary" onClick={close}>
                    Close
                </Button>
            </div>
        </div>
    )
}

export default CreatePage;