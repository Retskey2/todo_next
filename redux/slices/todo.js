import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from "next-redux-wrapper";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: [{message: "Ваша первая задача", progress: false}],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todo.unshift({message: action.payload, progress: false})
        },
        removeTodo: (state, action) => {
            state.todo.splice(action.payload, 1)
        },
        completeTodo: (state, action) => {
            state.todo[action.payload].progress = !state.todo[action.payload].progress
        },
        returnTodo: (state, action) => {
            state.todo = action.payload
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

export const {addTodo, removeTodo, returnTodo, completeTodo} = todoSlice.actions

export const selectTodoData = (state) => state.todo;

export const todoReducer = todoSlice.reducer;