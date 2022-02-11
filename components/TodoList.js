import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import deleteIcon from "../public/delete.png";
import React, {useEffect, useState} from "react";
import {removeTodo, returnTodo, selectTodoData} from "../redux/slices/todo";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

export default function TodoList() {
    const todoData = useAppSelector(selectTodoData)
    const dispatch = useAppDispatch();

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(todoData.todo)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        dispatch(returnTodo(items))
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
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todoData.todo.length >= 1 ?
                            Object.entries(todoData.todo)
                                .map(([key, value], index) => {
                                    return (
                                        <Draggable key={key} draggableId={key} index={index}>
                                            {(provided) => (
                                                <div className={styles.todo}
                                                     key={key} {...provided.draggableProps} {...provided.dragHandleProps}
                                                     ref={provided.innerRef}>
                                                    {value.message}
                                                    <Image
                                                        onClick={() => {
                                                            deleteTodoApp(key)
                                                        }}
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
                            : <div className={styles.head}>У вас нету дел 🙁</div>
                        } {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}