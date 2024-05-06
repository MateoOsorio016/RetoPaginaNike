import axios from 'axios';

export const getProducts = () => {
    return axios.get('http://localhost:8000/api/products/products/')
}