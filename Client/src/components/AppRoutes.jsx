import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {SignupPage} from "../pages/SignupPage.jsx";
import {VerificationPage} from "../pages/VerificationPage.jsx";
import {AccountPage} from "../pages/AccountPage.jsx";
import {useSelector} from "react-redux";

export const AppRoutes = () => {
    const account = useSelector((state) => state.account);
    const verification = useSelector((state) => state.verification);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/sign-up' element={ <SignupPage /> } />
                <Route path='/' element={ account === true ? (<AccountPage />) : (<Navigate to="/sign-up" />) } />
                <Route path='/verification' element={ verification === true ? (<VerificationPage />) : (<Navigate to="/sign-up" />) } />
            </Routes>
        </BrowserRouter>
    )
}
