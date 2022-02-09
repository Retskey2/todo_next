import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from "next-redux-wrapper";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: {
            1: {id: 1, message: "python"},
            2: {id: 2, message: "react"},
            3: {id: 3, message: "javaScript"}
        }
    },
    reducers: {
        addTodo(state, action) {
            const newId = Object.keys(state.todo).length + 1;
            console.log(newId)
            state.todo[newId] = {
                id: newId,
                message: action.payload
            }
        },
        removeTodo(state, action) {
            delete state.todo[action.payload]
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