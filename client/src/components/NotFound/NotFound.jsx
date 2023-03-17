import React from "react";
import pirat from "../../assets/final-pirat.png";
import styles from "./NotFound.module.css";
const NotFound = () => {
    return (
        <div>
            <h1 className={styles.lost}>Are you lost?</h1>
            <h3 className={styles.notFoundTitle} >Page Not Found</h3>
            <img className={styles.pirateImg} src={pirat} alt="imagen" />
        </div>
    )
}

export default NotFound;