import axios from 'axios';
import { config } from '../config';

const apiClient = axios.create({
    baseURL: config.api.baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;