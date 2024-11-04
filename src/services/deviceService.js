import apiInstances from './api';

export const deviceListService = async () => {
    const response = await apiInstances.get('/device');
    return response;
};

export const updateDeviceService = async (id, value) => {
    const response = await apiInstances.put(`/device/${id}`, value);
    return response
};
