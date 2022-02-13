import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from "next-redux-wrapper";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        progressTodo: [{message: "Ваша первая задача", progress: false}],
        completeTodo: [{message: "Задача выполнена", progress: true}]
    },
    reducers: {
        addTodo: (state, action) => {
            state.progressTodo.unshift({message: action.payload, progress: false})
        },
        removeTodo: (state, action) => {
            state.progressTodo.splice(action.payload, 1)
        },
        completeTodo: (state, action) => {
            state.progressTodo[action.payload].progress = !state.progressTodo[action.payload].progress
            state.completeTodo.push(state.progressTodo[action.payload])
            state.progressTodo.splice(action.payload, 1)
        },
        returnTodo: (state, action) => {
            state.progressTodo = action.payload
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.progressTodo,
                ...action.payload.completeTodo,
            }
        }
    }
})

export const {addTodo, removeTodo, returnTodo, completeTodo} = todoSlice.actions

export const selectTodoData = (state) => state.todo;

export const todoReducer = todoSlice.reducer;