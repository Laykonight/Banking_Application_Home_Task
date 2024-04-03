import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignupPage} from "../pages/SignupPage.jsx";
import {VerificationPage} from "../pages/VerificationPage.jsx";
import {AccountPage} from "../pages/AccountPage.jsx";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <AccountPage /> } />
                <Route path='/sign-up' element={ <SignupPage /> } />
                <Route path='/verification' element={ <VerificationPage /> } />
            </Routes>
        </BrowserRouter>
    )
}
