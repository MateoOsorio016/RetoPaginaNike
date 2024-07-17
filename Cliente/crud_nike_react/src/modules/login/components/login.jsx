import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { login, register } from '../api/apilogin';
import { useNavigate } from 'react-router-dom';
import './login.css';
import email from '../../../assets/email.png';
import password from '../../../assets/password.png';

export function LoginPage() {
    const navigate = useNavigate();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const { register: registerForm, handleSubmit: handleSubmitForm, setError, formState: { errors } } = useForm();

    const onSubmit = handleSubmitForm(async data => {
        data.group = 1;
        try {
            if (isLoginForm) {
                const res = await login(data);
                if (res.data.access) {
                    localStorage.setItem('token', JSON.stringify(res.data));
                    navigate('/productsList');
                }
            } else {
                const res = await register(data);
                setIsRegistered(true);
            }
        } catch (error) {
            if(error.response && error.response.data){
                const errormessage = Object.values(error.response.data).flat().join("\n");
                console.log(errormessage);
                if (error.response.data.email) {
                    setError( 'email', {
                        type: 'manual',
                        message: errormessage
                    });

                }else{
                    setError( 'password', {
                        type: 'manual',
                        message: errormessage
                    });
                }
            }
                
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
        <div>
        <div className='container-login'>
        <div class="card-login">
    <div class="left-section">
        <h1>JUST DO IT.</h1>
            <img class="nike" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2000px-Logo_NIKE.svg.png" style={{height: "50px" , width: "100px" , marginLeft: "110px"}} />
        </div>
    <div class="right-section">
        <div className="login-page">
            <h1>{isLoginForm ? 'Iniciar Sesión' : 'Registrate'}</h1>
            {isRegistered ? (
                <div className='register-ok'>
                    <p>Registro Exitoso!</p>
                    <button onClick={handleRedirectToLogin}>Go to Login</button>
                </div>
            ) : (
                <form onSubmit={handleSubmitForm(onSubmit)} className="login-form">
                    {!isLoginForm && (
                        <div className="inputs">
                            <div className="input">
                                <input type="text" {...registerForm("username", { required: true })} placeholder='Username' />
                                {errors.username && <span className='errors'>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <input type="text" {...registerForm("first_name", { required: true })} placeholder='Nombre' />
                                {errors.first_name && <span className='errors'>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <input type="text" {...registerForm("last_name", { required: true })} placeholder='Apellido' />
                                {errors.last_name && <span className='errors'>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <input type="text" {...registerForm("address", { required: true })} placeholder='Dirección' />
                                {errors.address && <span className='errors'>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <input type="tel" {...registerForm("phone", { required: true })} placeholder='Telefono' />
                                {errors.phone && <span className='errors'>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <input type="date" {...registerForm("birthdate", { required: true })} placeholder='Fecha de nacimiento' />
                                {errors.birthdate && <span className='errors'>Este campo es requerido</span>}
                            </div>
                        </div>
                    )}
                    <div className="inputs">
                        <div className="input">
                            <input type="email" {...registerForm("email", { required: true })} placeholder='Email' autoComplete='off' />
                            {errors.email  && <span className='errors'>{errors.email.message || 'Este campo es requerido'}</span>}
                        </div>
                        <div className="input">
                            <input type="password" {...registerForm("password", { required: true })} placeholder='Contraseña' autoComplete='off' />
                            {errors.password && <span className='errors'>{errors.password.message || 'Este campo es requerido'}</span>}
                        </div>
                    </div>
                    <div className="register">
                        {isLoginForm ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
                        <span onClick={toggleForm} style={{ cursor: 'pointer' }}>{isLoginForm ? 'Registrate aquí!' : 'Entre aquí!'}</span>
                        <hr />
                        <a className="rest-password"href="/reset_password">Olvidasdes tu contraseña?</a>
                    </div>
                    <div className="submit-container">
                        <button className="submit">{isLoginForm ? 'Iniciar sesión' : 'Registrarse'}</button>
                    </div>
                </form>
            )
            }
        </div>
    </div>
</div>
</div>
</div>
    );
};
