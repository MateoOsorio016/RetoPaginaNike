import axios from "axios";

export const getProduct = (id) => {
    return axios.get(`http://localhost:8000/api/products/retrieve/${id}`);
}
export const getProductsList = () => {
    return axios.get("http://localhost:8000/api/products/list");
}
export const postProducts = (name, price, quantity, category, description, image) => {
    return axios.post("http://localhost:8000/api/products/create", name, price, quantity, category, description, image);
}
export const putProduct = (id, name, price, quantity, category, description, image) => {
    return axios.put(`http://localhost:8000/api/products/update/${id}`, name, price, quantity, category, description, image);
}

export const deleteProduct = (id) => {
    return axios.delete(`http://localhost:8000/api/products/delete/${id}`);
}