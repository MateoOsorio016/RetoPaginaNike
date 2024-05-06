import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUsers } from '../api/users';
import './../../../components/formmodal/Form.css'


export function EditUserForm () {
    const navigate = useNavigate();
    const [isUserForm, setIsUserForm] = useState(true);
    const params = useParams();
    const { register: registerForm, handleSubmit: handleSubmitForm, formState: { errors }, setValue } = useForm();

    const onSubmit = handleSubmitForm(async data => {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('birthdate', data.birthdate);
        formData.append('email', data.email);
        try {
            await updateUsers(params.id, formData);
            setIsUserForm(true);
            navigate('/admin');
        } catch (error) {
            console.error('Error updating user', error);
        }
    });

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const res = await getUser(params.id);
                console.log(res.data, "esto traje");
                setValue('username', res.data.username);
                setValue('first_name', res.data.first_name);
                setValue('last_name', res.data.last_name);
                setValue('address', res.data.address);
                setValue('phone', res.data.phone);
                setValue('birthdate', res.data.birthdate);
                setValue('email', res.data.email);
            }
        }
        loadUser();
    }, []);

    return (
        <>
        <h1 className='title'>Editar Perfil</h1>
        <form onSubmit={handleSubmitForm(onSubmit)} className="form-container">
            <div className="inputs">
                <div className="input">
                    <input type="text" {...registerForm("username", { required: true })} placeholder='Username' />
                    {errors.username && <span>This field is required</span>}
                </div>
                <div className="input">
                    <input type="text" {...registerForm("first_name", { required: true })} placeholder='First Name' />
                    {errors.first_name && <span>This field is required</span>}
                </div>
                <div className="input">
                    <input type="text" {...registerForm("last_name", { required: true })} placeholder='Last Name' />
                    {errors.last_name && <span>This field is required</span>}
                </div>
                <div className="input">
                    <input type="text" {...registerForm("address", { required: true })} placeholder='Address' />
                    {errors.address && <span>This field is required</span>}
                </div>
                <div className="input">
                    <input type="tel" {...registerForm("phone", { required: true })} placeholder='Phone' />
                    {errors.phone && <span>This field is required</span>}
                </div>
                <div className="input">
                    <input type="date" {...registerForm("birthdate", { required: true })} placeholder='Birthdate' />
                    {errors.birthdate && <span>This field is required</span>}
                </div>
                <div className="input">
                    <input type="email" {...registerForm("email", { required: true })} placeholder='Email' />
                    {errors.email && <span>This field is required</span>}
                </div>
            </div>
            <div className="submitContainer">
                <button className="ButtonCreate">Actualizar</button>
            </div>
        </form>
        </>
    );
};
