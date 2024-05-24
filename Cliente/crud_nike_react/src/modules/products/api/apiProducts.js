import axios from "axios";

export const getProduct = (id) => {
    return axios.get(`http://localhost:8000/api/products/retrieve/${id}`);
}
export const getProductsList = (page= 1, order, searchTerm) => {
    return axios.get(`http://localhost:8000/api/products/list?page=${page}&order=${order}&search=${searchTerm}`);
}
export const postProducts = (name, price, quantity, category, description, image) => {
    return axios.post("http://localhost:8000/api/products/create", name, price, quantity, category, description, image);
}
export const putProduct = (id, name, price, quantity, category, description, image) => {
    return axios.put(`http://localhost:8000/api/products/update/${id}`, name, price, quantity, category, description, image);
}

export const deleteProduct = (id) => {
    return axios.put(`http://localhost:8000/api/products/delete/${id}`);
}

export const Category = () => {
    return axios.get("http://localhost:8000/api/category/list/active");
}