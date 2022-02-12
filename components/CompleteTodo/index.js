import styles from "./CompleteTodo.module.scss"
import React from "react";

export default function CompleteTodo() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>Выполнено</div>
        </div>
    )
}