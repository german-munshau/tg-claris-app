import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<MainPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
