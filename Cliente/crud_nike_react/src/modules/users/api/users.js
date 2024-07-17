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


export const updateUsers = (id, username, first_name, last_name, address, phone , birthdate, email ) => {
    return API_URL.put(`/update_user/${id}`, username , first_name, last_name, address, phone , birthdate, email);
}
export const getUser = (id) => {
    return API_URL.get(`/get_user/${id}`);
}
export const getUsers = (page= 1, order, searchTerm= '') => {
    return API_URL.get(`/get_users?page=${page}&order=${order}&search=${searchTerm}`);
}

export const getGroups = () => {
    return API_URL.get('/users/groups');
}
export const postUsers = (username, first_name, last_name, address, phone , birthdate, email, password, group ) => {
    return axios.post('http://localhost:8000/api/register', username , first_name, last_name, address, phone , birthdate, email, password, group);
}

export const cargarUsuarios = (file) => {
    return API_URL.post('/UsersExcel', file);
}
export const deleteUsers = (id) => {
    return API_URL.put(`/delete_user/${id}`);
}


