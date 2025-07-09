import React, {useEffect, useState} from "react";
import {PageType} from "../../../types/types.ts";
import {apiGetPages} from "../../../api/dashboard.ts";
import Page from "./page/Page.tsx";
import styles from "./Pages.module.css"

const Pages: React.FC = () => {

    const [pages, setPages] = useState<PageType[]>([])
    const [fetching, setFetching] = useState<boolean>(true);


    useEffect(() => {
        if (fetching) {
            apiGetPages().then((res) => {
                setFetching(false);
                setPages(res.data);
                console.log(res.data);
            }).catch(() => {
            })
        }
    }, [fetching, pages]);

    return (
        <div className={styles.wrapper}>
            {pages.map((page: PageType) => (
                <Page title={page.title} slug={page.slug} id={page.id} key={page.id} />
            ))}
        </div>
    )
}

export default Pages;