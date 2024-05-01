import {useDispatch} from 'react-redux';
import {logout} from "../../../store/Slices/authSlice.js";


const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <button onClick={handleLogout} style={{padding: "10px", border: "1px solid black"}}>
            Logout
        </button>
    );
};

export default Logout;
