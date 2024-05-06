import axios from "axios";

export const login = (email, password) => {
    return axios.post('http://localhost:8000/api/login', email, password);
}

export const register = (username, first_name, last_name, address, phone , birthdate, email, password, group ) => {
    return axios.post('http://localhost:8000/api/users/register', username , first_name, last_name, address, phone , birthdate, email, password, group);
}
