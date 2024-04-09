import {AppRoutes} from "./components/AppRoutes.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/Store.jsx";

function App() {
    return (
        <Provider store={store}>
            <AppRoutes/>
        </Provider>
    )
}

export default App
