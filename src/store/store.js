// store.js
import {configureStore} from '@reduxjs/toolkit';
import authReducer, {refreshToken} from './Slices/authSlice.js';
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://localhost:8000',
});

api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await store.dispatch(refreshToken());
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);


const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

export default store;
