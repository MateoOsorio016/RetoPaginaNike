import axios from 'axios';

export const getCategories = async (page, searchTerm) => {
   return await axios.get(`http://localhost:8000/api/category/list?page=${page}&search=${searchTerm}`);
}

export const getCategory = async (id) => {
    return await axios.get(`http://localhost:8000/api/category/retrieve/${id}`);
}

export const postCategory = async (name, description) => {
    return await axios.post('http://localhost:8000/api/category/create', name, description);
}

export const putCategory = async (id, name, description) => {
    return await axios.put(`http://localhost:8000/api/category/update/${id}`, name, description);
}

export const deleteCategory = async (id) => {
    return await axios.put(`http://localhost:8000/api/category/delete/${id}`);
}