import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DocumentPage from "./pages/DocumentPage/DocumentPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<MainPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/search'} element={<SearchPage/>}/>
                <Route path={'/show/:id'} element={<DocumentPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
