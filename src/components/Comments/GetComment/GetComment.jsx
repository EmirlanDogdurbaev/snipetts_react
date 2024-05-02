import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getComments } from "../../../store/Slices/commentSlice.js";

const GetComment = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.comment);
    const comments = useSelector(state => state.comment.comments);

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);


    return (
        <div>
            <h4>Comments:</h4>
            {status === "loading" && <h2>Loading</h2>}
            {error && <h2>Error : {error}</h2>}
            {comments.map(comment => (
                <div key={comment.id} style={{ marginBottom: "10px", border: "1px solid red", padding: "10px 20px" }}>
                    {comment.title}
                </div>
            ))}
        </div>
    );
}

export default GetComment;
