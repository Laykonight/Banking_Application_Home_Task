import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {AppRoutes} from "./components/AppRoutes.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/Store.jsx";

// import './App.css'

function App() {
    return (
        <Provider store={store}>
            <AppRoutes/>
        </Provider>
    )
}

export default App
