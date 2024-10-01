import axios from 'axios';


const apiInstances = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 1000,
    headers: { headers: { 'Content-Type': 'application/json' } },
});

apiInstances.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);
export default apiInstances;
