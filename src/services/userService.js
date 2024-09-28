import api from './api';

export const checkLogin = async (data) => {
    const response = await api.post('/auth/login', data);
    return response;
};
