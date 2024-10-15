import api from './api';

export const getList = async () => {
    const response = await api.get('/support');
    return response.data;
};

export const getListByQuery = async (data) => {
    const response = await api.get(`/support?q=${data}`);
    return response.data;
};

export const replyService = async (data, supportId) => {
    const response = await api.put(`/support/${supportId}`, data);
    return response;
};
