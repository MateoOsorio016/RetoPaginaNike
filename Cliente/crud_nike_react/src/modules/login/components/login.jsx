import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { login, register } from '../api/apilogin';
import { useNavigate } from 'react-router-dom';
import './login.css';
import email from '../../../assets/email.png';
import password from '../../../assets/password.png';

export const LoginModal = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const { register: registerForm, handleSubmit: handleSubmitForm, formState: { errors } } = useForm();

    const onSubmit = handleSubmitForm(async data => {
        if (isLoginForm) {
            const res = await login(data);
            console.log(res);
            if (res.data.token) {
                console.log('Logged in');
                navigate('/admin');
            }
        } else {
            const res = await register(data);
            console.log(res);
            setIsRegistered(true);
        }
    });

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    const handleRedirectToLogin = () => {
        setIsLoginForm(true);
        setIsRegistered(false);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isLoginForm ? 'Log In' : 'Sign Up'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isRegistered ? (
                    <div>
                        <p>Registration successful!</p>
                        <Button variant="primary" onClick={handleRedirectToLogin}>Go to Login</Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmitForm(onSubmit)} className="modalContainer">
                        {!isLoginForm && (
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
                            </div>
                        )}
                        <div className="inputs">
                            <div className="input">
                                <img src={email} alt="" />
                                <input type="email" {...registerForm("email", { required: true })} placeholder='Email' />
                                {errors.email && <span>This field is required</span>}
                            </div>
                            <div className="input">
                                <img src={password} alt="" />
                                <input type="password" {...registerForm("password", { required: true })} placeholder='Password' />
                                {errors.password && <span>This field is required</span>}
                            </div>
                        </div>
                        <div className="register">
                            {isLoginForm ? 'Don\'t have an account? ' : 'Already have an account? '}
                            <span onClick={toggleForm}>{isLoginForm ? 'Sign up here!' : 'Log in here!'}</span>
                        </div>
                        <div className="submitContainer">
                            <button className="submit">{isLoginForm ? 'Log in' : 'Sign up'}</button>
                        </div>
                    </form>
                )}
            </Modal.Body>
        </Modal>
    );
};
