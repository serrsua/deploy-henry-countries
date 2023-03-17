import React from "react";
import pirat from "../../assets/final-pirat.png";
import styles from "./NotFound.module.css";
const NotFound = () => {
    return (
        <div>
            <h1 className={styles.notFoundTitle}>Page Not Found</h1>
            <img className={styles.pirateImg} src={pirat} alt="imagen" />
        </div>
    )
}

export default NotFound;