import {useState} from 'react';
import {useDispatch} from "react-redux";
import {postComment} from "./store/Slices/commentSlice.js";
import Logout from "./components/Auth/Logout/Logout.jsx";
import CreateComment from "./components/Comments/CreateComment/CreateComment.jsx";
import GetComment from "./components/Comments/GetComment/GetComment.jsx";
import {Route, Routes} from "react-router-dom";
import Register from "./components/Auth/Register/Register.jsx";
import Login from "./components/Auth/Login/Login.jsx";

const App = () => {
    const [commentsData, setCommentsData] = useState({
        title: "",
        body: ""
    });

    const dispatch = useDispatch();

    const addComment = (commentData) => {
        dispatch(postComment(commentData));
        setCommentsData({ title: "", body: "" });
    };

    return (
        <>
            <div>
                <Logout />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Login />} />
                </Routes>

                <CreateComment
                    value={commentsData}
                    postComment={addComment}
                    updateText={setCommentsData}
                />

                <GetComment />
            </div>
        </>
    );
};

export default App;
