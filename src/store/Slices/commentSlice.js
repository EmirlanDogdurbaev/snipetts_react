import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {COMMENT_API} from "../api/api.js";

export const getComments = createAsyncThunk(
    "comment/getComments",
    async function (_, {rejectedWithValue}) {
        try {
            const res = await axios.get(`${COMMENT_API}/posts?_limit=10/`);
            if (res.status !== 200) {
                throw new Error('server error');
            }
            return res.data;
        } catch (error) {
            return rejectedWithValue(error.message);
        }
    }
);

export const postComment = createAsyncThunk(
    'todos/addNewTodo',
    async function (commentData, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                title: commentData.title,
                userId: 1,
                body: commentData.body,
            };

            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', todo);

            if (response.status !== 201) { // Assuming status code 201 indicates success
                throw new Error('Can\'t add task. Server error.');
            }

            dispatch(addComment(response.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async (commentId) => {
        const response = await axios.delete(`/api/comments/${commentId}`);
        return response.data;
    }
);

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        status: null,
        error: null,
    },
    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload);
        },
        removeComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload.id);
        },
        updateComment: (state, action) => {
            const {id, text} = action.payload;
            const commentToUpdate = state.comments.find(comment => comment.id === id);
            if (commentToUpdate) {
                commentToUpdate.text = text;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state,) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.status = "success";
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload.message : "Server error";
            });
    },
});

export const {addComment, removeComment, updateComment} = commentSlice.actions;

export default commentSlice.reducer;
