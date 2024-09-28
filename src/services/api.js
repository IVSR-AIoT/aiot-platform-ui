import axios from 'axios';

const apiInstances = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000,
    headers: { headers: { 'Content-Type': 'application/json' } },
});

export default apiInstances