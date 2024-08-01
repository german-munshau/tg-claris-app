import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import DocumentPage from "./components/DocumentPage/DocumentPage";
import './App.css';

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
