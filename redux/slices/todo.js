import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from "next-redux-wrapper";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: [
            {message: "python"},
            {message: "react"},
            {message: "javaScript"}
        ]
    },
    reducers: {
        addTodo(state, action) {
            state.todo.push({ message: action.payload})
        },
        removeTodo(state, action) {
            state.todo.splice(action.payload, 1)
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.todo,
            }
        }
    }
})

export const {addTodo, removeTodo} = todoSlice.actions
export const selectTodoData = (state) => state.todo;
export const todoReducer = todoSlice.reducer;