import axios from "axios";


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

export const getProduct = (id) => {
    return API_URL.get(`/products/retrieve/${id}`);
}
export const getProductsList = (page= 1, order, searchTerm) => {
    return API_URL.get(`/products/list?page=${page}&order=${order}&search=${searchTerm}`);
}
export const postProducts = (name, price, quantity, category, description, image) => {
    return API_URL.post("/products/create", name, price, quantity, category, description, image);
}
export const putProduct = (id, name, price, quantity, category, description, image) => {
    return API_URL.put(`/products/update/${id}`, name, price, quantity, category, description, image);
}

export const deleteProduct = (id) => {
    return API_URL.put(`/products/delete/${id}`);
}

export const Category = () => {
    return API_URL.get("/category/list/active");
}
export const ProductExport = () => {
    return API_URL.get("/productsExport", {responseType: 'blob'});
}