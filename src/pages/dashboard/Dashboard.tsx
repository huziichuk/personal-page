import React, {useState} from "react";
import styles from "./Dashboard.module.css";
import addLightIcon from "../../assets/add-light.svg"
import addDarkIcon from "../../assets/add-dark.svg"
import ThemedImage from "../../components/themedImage/ThemedImage.tsx";
import CreatePage from "./createPage/CreatePage.tsx";
import Pages from "./pages/Pages.tsx";

const Dashboard: React.FC  = () => {

    const [isPageCreateOpen, setIsPageCreateOpen] = useState<boolean>(false);

    const closePageCreateModal = () => {
        setIsPageCreateOpen(false);
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.title_block}>
                <p className={styles.title}>Pages</p>
                <button onClick={() => setIsPageCreateOpen(prevState => !prevState)} className={`${styles.title_block__button} ${isPageCreateOpen ? styles.active : ""}`}>
                    <ThemedImage className={styles.title_img} srcDark={addDarkIcon} srcLight={addLightIcon}/>
                </button>
            </div>
            {isPageCreateOpen && <CreatePage close={closePageCreateModal} />}
            <Pages />
        </div>
    )
}
export default Dashboard;