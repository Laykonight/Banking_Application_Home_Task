import { configureStore } from '@reduxjs/toolkit';
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: '',
    account: false,
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
        logout: (state) => {
            state.token = '';
            state.account = false;
        },
    },
});

export const { setToken, setAccountAvailable, logout } = bankAccountSlice.actions;

export const store = configureStore({ reducer: bankAccountSlice.reducer });