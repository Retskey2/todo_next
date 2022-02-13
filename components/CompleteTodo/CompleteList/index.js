import styles from "./CompleteList.module.scss"
import Image from "next/image";
import deleteIcon from "../../../public/delete.png";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {removeCompleteTodo, removeTodo, selectTodoData} from "../../../redux/slices/todo";

export default function CompleteList() {
    const todoData = useAppSelector(selectTodoData)
    const dispatch = useAppDispatch();

    return (
        <div className={styles.wrapper}>
            {Object.entries(todoData.completeTodo)
                .map(([key, value], index) => {
                    return (
                        <div className={styles.todo} key={key}>
                            <div className={styles.todo__label}>
                                {value.message}
                            </div>
                            <Image
                                onClick={() => dispatch(removeCompleteTodo(key))}
                                className={styles.image}
                                src={deleteIcon}
                                width={32}
                                height={32}
                            />
                        </div>

                    )
                })}
        </div>
    )
}