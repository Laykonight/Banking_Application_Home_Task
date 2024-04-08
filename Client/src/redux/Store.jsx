import { configureStore } from '@reduxjs/toolkit';
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: '',
    account: false,
    verification: false,
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
        setVerification: (state) => {
            state.verification = true;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        logout: (state) => {
            return {...bankAccountSlice.getInitialState };
        },
    },
});

export const {
    setToken,
    setAccountAvailable,
    setEmail,
    setVerification,
    logout } = bankAccountSlice.actions;

export const store = configureStore({ reducer: bankAccountSlice.reducer });