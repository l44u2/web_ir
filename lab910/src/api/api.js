import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const getItems = (params) => {
    return axios.get(`${API_BASE_URL}/items`, { params });
};

export const getItemById = (id) => {
    return axios.get(`${API_BASE_URL}/items/${id}`);
};
