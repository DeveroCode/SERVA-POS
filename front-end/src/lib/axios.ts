import { GET_TOKEN_KEY } from '@/utils/key';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

/** Send token to backend */
api.interceptors.request.use(config => {
    const token = localStorage.getItem(GET_TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;