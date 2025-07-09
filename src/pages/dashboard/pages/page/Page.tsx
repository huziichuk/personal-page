import React, {useEffect, useState} from "react";
import {FieldType, PageWithFieldsType, RepeaterType} from "../../../../types/types.ts";
import {apiGetPage} from "../../../../api/dashboard.ts";
import styles from "./Page.module.css"
import ThemedImage from "../../../../components/themedImage/ThemedImage.tsx";
import triangleDarkIcon from "../../../../assets/triangle-dark.svg"
import triangleLightIcon from "../../../../assets/triangle-light.svg"
import binDarkIcon from "../../../../assets/bin-dark.svg"
import binLightIcon from "../../../../assets/bin-light.svg"
import editDarkIcon from "../../../../assets/edit-dark.svg"
import editLightIcon from "../../../../assets/edit-light.svg"
import Field from "./field/Field.tsx";
import addDarkIcon from "../../../../assets/add-dark.svg";
import addLightIcon from "../../../../assets/add-light.svg";
import CreateField from "./createField/CreateField.tsx";
import Button from "../../../../components/button/Button.tsx";
import CreateRepeater from "./createRepeater/CreateRepeater.tsx";
import Repeater from "./repeater/Repeater.tsx";

type Props = {
    title: string;
    slug: string;
    id: number;
}

enum CreateEnumType {
    field = "field",
    repeater = "repeater",
}

const Page: React.FC<Props> = ({title, slug, id}) => {

    const [page, setPage] = useState<PageWithFieldsType | null>(null);
    const [fetching, setFetching] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCreateField, setIsOpenCreateField] = useState<boolean>(false);
    const [createType, setCreateType] = useState<CreateEnumType>(CreateEnumType.field);


    useEffect(() => {
        if (fetching) {
            apiGetPage(slug).then((res) => {
                console.log(res.data)
                setPage(res.data);
                setFetching(false);
            })
        }
    }, [fetching, page, slug])

    const openCreateFieldHandler = () => {
        if (isOpenCreateField) {
            if (page?.fields?.length === 0 && page?.repeaters?.length === 0) setIsOpen(false)
            setIsOpenCreateField(false);
        } else {
            setIsOpenCreateField(true);
            setIsOpen(true);
        }
    }

    const isOpenChangeHandler = () => {
        if (isOpen) {
            setIsOpen(false)
            setIsOpenCreateField(false);
        } else {
            setIsOpen(true)
        }
    }

    const addNewField = (field: FieldType) => {
        setPage(prevState => {
            if (!prevState) {
                return null;
            }
            return {
                ...prevState,
                fields: [...prevState.fields, field]
            };
        });
    };

    const addNewRepeater = (repeater: RepeaterType) => {
        setPage(prevState => {
            if (!prevState) {
                return null;
            }
            return {
                ...prevState,
                repeaters: [...prevState.repeaters, repeater]
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
                <p className={styles.header__title}>{title}</p>
                <button onClick={openCreateFieldHandler}
                        className={`${styles.title_block__button} ${isOpenCreateField ? styles.active : ""}`}>
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
                {isOpenCreateField && <>
                    <div className={styles.header_wrapper}>
                        <div className={styles.buttons}>
                            <Button onClick={() => {
                                setCreateType(CreateEnumType.field)
                            }} className={styles.button}
                                    variant={createType === CreateEnumType.field ? "primary" : "secondary"}>
                                Field
                            </Button>
                            <Button onClick={() => {
                                setCreateType(CreateEnumType.repeater)
                            }} className={styles.button}
                                    variant={createType === CreateEnumType.repeater ? "primary" : "secondary"}>
                                Repeater
                            </Button>
                        </div>

                        {createType === CreateEnumType.field ? <CreateField addNewField={addNewField} pageId={id} close={() => setIsOpenCreateField(false)}/> : <CreateRepeater close={() => setIsOpenCreateField(false)} pageId={id} addNewRepeater={addNewRepeater}/>}
                    </div>
                </>}
                {page ? <>
                    {page.repeaters.map(repeater => (
                        <Repeater repeater={repeater} key={repeater.id}/>
                    ))}
                    {page.fields.map(field => (
                        <Field field={field} key={field.id}/>
                    ))}
                </> : null}
            </div>}
        </div>
    )
}

export default Page;