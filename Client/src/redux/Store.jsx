import { configureStore } from '@reduxjs/toolkit';
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: '',
    account: false,
    email: '',
};
const bankAccountSlice = createSlice({
    name: 'bankAccount', 
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setAccountAvailable: (state) => {
            state.account = true;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        logout: (state) => {
            state.token = '';
            state.email = '';
            state.account = false;
        },
    },
});

export const {
    setToken,
    setAccountAvailable,
    setEmail,
    logout } = bankAccountSlice.actions;

export const store = configureStore({ reducer: bankAccountSlice.reducer });