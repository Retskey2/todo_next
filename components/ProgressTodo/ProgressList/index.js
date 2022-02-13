import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styles from "./TodoList.module.scss"
import Image from "next/image";
import deleteIcon from "../../../public/delete.png";
import React from "react";
import {completeTodo, removeTodo, returnTodo, selectTodoData} from "../../../redux/slices/todo";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";

export default function ProgressList() {
    const todoData = useAppSelector(selectTodoData)
    const dispatch = useAppDispatch();

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(todoData.progressTodo)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        dispatch(returnTodo(items))
    }

    function handleViewCheckbox(id) {
        if (todoData.progressTodo[id].progress) {
            console.log('В стопку!1')
        } else
            dispatch(completeTodo(id))
    }

    function deleteTodoApp(id) {
        if (id !== '') {
            dispatch(removeTodo(id))
        }
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className={styles.wrapper}>
                        {todoData.progressTodo.length >= 1 ?
                            Object.entries(todoData.progressTodo)
                                .map(([key, value], index) => {
                                    return (
                                        <Draggable key={key} draggableId={key} index={index}>
                                            {(provided) => (
                                                <div className={styles.todo}
                                                     key={key} {...provided.draggableProps} {...provided.dragHandleProps}
                                                     ref={provided.innerRef}>
                                                    <div className={styles.todo__label}>
                                                        <input type="checkbox"
                                                               checked={todoData.progressTodo[key].progress}
                                                               onChange={() => handleViewCheckbox(key)}
                                                        />
                                                        {value.message}
                                                    </div>
                                                    <Image
                                                        onClick={() => deleteTodoApp(key)}
                                                        className={styles.image}
                                                        src={deleteIcon}
                                                        width={32}
                                                        height={32}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })
                            : <div className={styles.text}>У вас нету дел 🙁</div>
                        } {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}