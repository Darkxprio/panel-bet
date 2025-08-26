import apiClient from './apiService';

interface LoginResponse {
    token: string;
    message: string;
}

const login = async (credentials: object): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
};

const storeToken = (token: string): void => {
    localStorage.setItem('authToken', token);
};

const logout = (): void => {
    localStorage.removeItem('authToken');
};

const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

const register = async (credentials: object): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/register', credentials);
    return response.data;
};

const authService = {
    login,
    storeToken,
    logout,
    getToken,
    register,
};

export default authService;