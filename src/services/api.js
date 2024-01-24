import axios from 'axios';
const api = axios.create({
    url:'http://localhost:3002/api/',
});
export default api;