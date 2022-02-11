import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from "next-redux-wrapper";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: [{message: "React"}],
    },
    reducers: {
        addTodo:(state, action)=> {
            state.todo.push({ message: action.payload})
        },
        removeTodo:(state, action) =>{
            state.todo.splice(action.payload, 1)
        },
        returnTodo:(state, action) =>{
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

export const {addTodo, removeTodo, returnTodo} = todoSlice.actions

export const selectTodoData = (state) => state.todo;

export const todoReducer = todoSlice.reducer;