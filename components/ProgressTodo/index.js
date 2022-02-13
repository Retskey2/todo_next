import styles from "./ProgressTodo.module.scss"
import Image from "next/image";
import plus from "../../public/plus.png";
import React, {useRef} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {addTodo} from "../../redux/slices/todo";
import ProgressList from "../ProgressList";

export default function ProgressTodo() {
    const refInput = useRef()
    const dispatch = useAppDispatch();
    const [isBrowser, setIsBrowser] = React.useState(false);

    React.useEffect(() => {
        setIsBrowser(process.browser);
    }, [])

    function addTodoApp() {
        const value = refInput.current.value
        if (value !== '') {
            dispatch(addTodo(value))
            refInput.current.value = ''
        }
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>В прогрессе</div>
            <div className={styles.form}>
                <input ref={refInput} type="text" placeholder="Todo.." className={styles.input}/>
                <div className={styles.addbtn} onClick={addTodoApp}>
                    <Image src={plus} width={24} height={24}/>
                </div>
            </div>
            {isBrowser ? <ProgressList/> : null}
        </div>
    )
}