import axios from 'axios';

const API_URL = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Interceptor para agregar el token en la petición

API_URL.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token && token.access) {
            config.headers['Authorization'] = `Bearer ${token.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const getCategories = async (page, searchTerm) => {
   return await API_URL.get(`/category/list?page=${page}&search=${searchTerm}`);
}

export const getCategory = async (id) => {
    return await API_URL.get(`/category/retrieve/${id}`);
}

export const postCategory = async (name, description) => {
    return await API_URL.post('/category/create', name, description);
}

export const putCategory = async (id, name, description) => {
    return await API_URL.put(`/category/update/${id}`, name, description);
}

export const deleteCategory = async (id) => {
    return await API_URL.put(`/category/delete/${id}`);
}