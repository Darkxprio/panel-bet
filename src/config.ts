const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const config = {
    api: {
        baseURL: API_BASE_URL,
    },
};