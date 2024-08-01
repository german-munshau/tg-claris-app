import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import './App.css';
import DocumentPage from "./components/DocumentPage/DocumentPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<MainPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/show/:id'} element={<DocumentPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
