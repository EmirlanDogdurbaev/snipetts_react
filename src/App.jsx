import {Route, Routes} from "react-router-dom";
import Register from "./components/Auth/Register/Register.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import Logout from "./components/Auth/Logout/Logout.jsx";

function App() {
    return (
        <>
            <div>
                <Logout/>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </div>

        </>
    );
}

export default App;
