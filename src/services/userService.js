import api from './api';

export const checkLogin = async (data) => {
    const response = await api.post('/auth/login', data);
    return response;
};

export const CreateUser = async (data) => {
    const response = await api.post('/auth/register', data);
    return response;
};
