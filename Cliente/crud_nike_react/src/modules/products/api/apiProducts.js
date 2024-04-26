import axios from "axios";

export const postProducts = () => {
    return axios.post("http://localhost:8000/api/products/create");
}

export const getProductsList = () => {
    return axios.get("http://localhost:8000/api/products/list");
}