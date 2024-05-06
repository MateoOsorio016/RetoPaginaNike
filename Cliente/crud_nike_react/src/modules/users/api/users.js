import axios from 'axios';

export const updateUsers = (id, username, first_name, last_name, address, phone , birthdate, email ) => {
    return axios.put(`http://localhost:8000/api/update_user/${id}`, username , first_name, last_name, address, phone , birthdate, email);
}
export const getUser = (id) => {
    return axios.get(`http://localhost:8000/api/get_user/${id}`);
}


