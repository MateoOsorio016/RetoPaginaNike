import axios from "axios";

export const login = (email, password) => {
    return axios.post('http://localhost:8000/api/login', email, password);
}

export const register = (username, first_name, last_name, address, phone , birthdate, email, password, group ) => {
    return axios.post('http://localhost:8000/api/register', username , first_name, last_name, address, phone , birthdate, email, password, group);
}

export const resetPassword = (email) => {
    return axios.post('http://localhost:8000/api/users/reset_password', email);
}

export const reset_password_confirm = (token, data) => {
    return axios.post(`http://localhost:8000/api/users/reset_password_confirm/`, {new_password: data.new_password, token: token});
}


