import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from "next-redux-wrapper";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: ['Изучить фреймворк', 'Понять и простить', 'изучить контент'],
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos.push(action.payload)
        },
    },
    extraReducers: {
        [HYDRATE]: (state,action) => {
            return {
                ...state,
                ...action.payload.todos,
            }
        }
    }
})

export const {addTodo} = todoSlice.actions
export const selectTodoData = (state) => state.todo;
export const todoReducer = todoSlice.reducer;