import {RepeaterFieldType, RepeaterType} from "../../../../../types/types.ts";
import React, {useState} from "react";
import {apiUpdateRepeater} from "../../../../../api/dashboard.ts";
import {AxiosError} from "axios";
import styles from "./Repeater.module.css";
import Button from "../../../../../components/button/Button.tsx";
import {repeaterSchema} from "../../../../../schemas/repeaterSchema.ts";
import CustomInput from "../../../../../components/customInput/CustomInput.tsx";
import RepeaterField from "./repeaterField/RepeaterField.tsx";
import ThemedImage from "../../../../../components/themedImage/ThemedImage.tsx";
import addDarkIcon from "../../../../../assets/add-dark.svg";
import addLightIcon from "../../../../../assets/add-light.svg";
import triangleDarkIcon from "../../../../../assets/triangle-dark.svg";
import triangleLightIcon from "../../../../../assets/triangle-light.svg";
import editDarkIcon from "../../../../../assets/edit-dark.svg";
import editLightIcon from "../../../../../assets/edit-light.svg";
import binDarkIcon from "../../../../../assets/bin-dark.svg";
import binLightIcon from "../../../../../assets/bin-light.svg";
import CreateRepeaterField from "./createRepeaterField/CreateRepeaterField.tsx";

type Props = {
    repeater: RepeaterType
}

const Repeater: React.FC<Props> = ({repeater}) => {
    const [repeaterLocal, setRepeaterLocal] = useState<RepeaterType | null>(repeater)
    const [isChanged , setIsChanged] = useState<boolean>(false);
    const [isFieldCreateOpen, setIsFieldCreateOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [key, setKey] = useState<string>(repeater.key);

    const [error, setError] = useState<string>("");

    const openCreateFieldHandler = () => {
        if (isFieldCreateOpen) {
            if (repeater?.fields?.length === 0 && repeater?.fields?.length === 0) setIsOpen(false)
            setIsFieldCreateOpen(false);
        } else {
            setIsFieldCreateOpen(true);
            setIsOpen(true);
        }
    }

    const isOpenChangeHandler = () => {
        if (isOpen) {
            setIsOpen(false)
            setIsFieldCreateOpen(false);
        } else {
            setIsOpen(true)
        }
    }

    const closePageCreateModal = () => {
        setIsFieldCreateOpen(false);
    }

    const clearHandler = () => {
        setIsChanged(false);
        setKey(repeater.key);
    }

    const keyChangeHandler = (newValue: string) => {
        setKey(newValue);
        setIsChanged(true);
    }

    const updateButtonHandler = () => {
        setError("");
        const result = repeaterSchema.safeParse({key,id:repeater.id});

        if (!result.success) {
            console.log(result);
            const firstError = result.error.errors[0]?.message;
            setError(firstError || "Validation error");
            return;
        }

        apiUpdateRepeater(result.data).then(() => {
            setIsChanged(false);
        }).catch(e => {
            if(e instanceof AxiosError) {
                setError(e.response?.data.message)
                return;
            }
            setError("Something went wrong");
        })
    }

    const addNewRepeaterField = (repeaterField: RepeaterFieldType) => {
        setRepeaterLocal(prevState => {
            if (!prevState) {
                return null;
            }
            return {
                ...prevState,
                fields: [...prevState.fields, repeaterField]
            };
        });
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <button onClick={isOpenChangeHandler}
                        className={`${styles.header__open_button} ${isOpen ? styles.active : ""}`}>
                    <ThemedImage className={`${styles.header__open_img} ${isOpen ? styles.active : ""}`}
                                 srcDark={triangleDarkIcon} srcLight={triangleLightIcon}/>
                </button>
                <p className={styles.header__title}>{repeater.title}</p>
                <button onClick={openCreateFieldHandler}
                        className={`${styles.title_block__button} ${isFieldCreateOpen ? styles.active : ""}`}>
                    <ThemedImage className={styles.title_img} srcDark={addDarkIcon} srcLight={addLightIcon}/>
                </button>
                <button className={`${styles.header__button} ${styles.edit_button}`}>
                    <ThemedImage srcDark={editDarkIcon} srcLight={editLightIcon}/>
                </button>
                <button className={`${styles.header__button} ${styles.delete_button}`}>
                    <ThemedImage srcDark={binDarkIcon} srcLight={binLightIcon}/>
                </button>
            </div>
            {isOpen && <div className={styles.page}>

                {error ? <p className={styles.error}>{error}</p> : null}
                <div className={styles.content}>
                    <CustomInput onChange={keyChangeHandler} title={"Repeater key"} value={key}/>
                </div>
                {isChanged && <div className={styles.buttons}>
                    <Button onClick={updateButtonHandler} className={styles.button} variant="primary">
                        Update
                    </Button>
                    <Button onClick={clearHandler} className={styles.button} variant="secondary">
                        Clear
                    </Button>
                </div>}
                {isFieldCreateOpen && <>
                    <div className={styles.header_wrapper}>
                        <CreateRepeaterField addNewRepeaterField={addNewRepeaterField} repeaterId={repeater.id} close={closePageCreateModal}/>
                    </div>
                </>}
                {repeaterLocal?.fields ? <>
                    {repeaterLocal.fields.map(field => (
                        <RepeaterField repeaterField={field} key={repeater.id}/>
                    ))}
                </> : null}
            </div>}
        </div>
    )
}

export default Repeater