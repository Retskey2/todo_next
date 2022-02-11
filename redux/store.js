import {configureStore} from '@reduxjs/toolkit'
import {todoReducer} from "./slices/todo";
import {createWrapper} from 'next-redux-wrapper';

export function makeStore() {
    return configureStore({
        reducer: {
            todo: todoReducer,
        },
    })
}


export const wrapper = createWrapper(makeStore);

