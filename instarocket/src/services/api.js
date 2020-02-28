import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.10.1.30:3334'
})

export default api;