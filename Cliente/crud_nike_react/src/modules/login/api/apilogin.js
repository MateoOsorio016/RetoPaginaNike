import axios from "axios";

export const login = (email, password) => {
    return axios.post('http://localhost:8000/api/login/users', email, password);
}

export const register = (username, first_name, last_name, address, phone , birthdate, email, password ) => {
    return axios.post('http://localhost:8000/api/register/users', username , first_name, last_name, address, phone , birthdate, email, password);
}