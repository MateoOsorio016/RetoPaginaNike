import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {reset_password_confirm} from '../api/apilogin'
import { useNavigate, useParams } from 'react-router-dom';
import NikeLogo from '../../../assets/NikeLogo.png';
import './reset.css';

export function ResetRasswordConfirm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const { register: registerForm, handleSubmit: handleSubmitForm, formState: { errors } } = useForm();

  console.log("Este es el token", token);


  const onSubmit = handleSubmitForm(async data => {
    try {
      await reset_password_confirm(token, data);
      setMessage('Contraseña restablecida');
      setError('');
      navigate('/loginPage');
    } catch (error) {
      setMessage('');
      setError(`Error al restablecer la contraseña: ${error.response?.data?.error || error.message}`);
    }
  });

  return (
    <div className='container-reset'>
      <div className="card-reset">
      <img className="img-reset" src={NikeLogo} alt="" />
      <h2 className='title-reset'>Restablecer Contraseña</h2>
      <form className='form-reset-1' onSubmit={handleSubmitForm(onSubmit)}>
        <div className='inputs-reset-1'>
          <input
            type="text"
            {...registerForm("new_password", { required: true })}
            placeholder="Nueva contraseña"
            />
            {errors.new_password && <span>This field is required</span>}
        </div>
        <button className='button-reset-1' type="submit">Cambiar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
    </div>
  );
}

