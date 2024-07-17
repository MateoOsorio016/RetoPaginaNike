import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {reset_password_confirm} from '../api/apilogin'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NikeLogo from '../../../assets/NikeLogo.png';
import axios from 'axios';
import './reset.css';

export function ResetRasswordConfirm() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();
  const { register: registerForm, handleSubmit: handleSubmitForm, formState: { errors } } = useForm();


  useEffect(() => {
    console.log("Este es el token", token);

    if(token){
      axios.get(`http://localhost:8000/api/users/verify_token/${token}`).then((response) => {
        console.log(response);
        setIsTokenValid(true);
        localStorage.setItem('token', token);
        navigate(`/api/users/reset_password/`, { replace: true });
      })
    .catch((error) => {
      console.error('Error al verificar el token', error.message);
      navigate('/page-not');
    });
    }
  }, [location, navigate]);


  // useEffect(() => {
  //   veryfyToken();
  // }, []);

//   const veryfyToken = async () => {
//     try {
//     const response = await axios.get(`http://localhost:8000/api/users/verify_token/${token}`);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//     if(error.response && error.response.status === 404) {
//       navigate('/page-not');
//     }else{
//       console.error('Error al verificar el token', error.message)
//     }
//   }
// }

  const onSubmit = handleSubmitForm(async data => {
    if(data.new_password !== data.new_password_confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await reset_password_confirm(token, data);
      setMessage('Contraseña restablecida');
      setError('');
      localStorage.removeItem('token');
      navigate('/loginPage');
    } catch (error) {
      setMessage('');
      setError(`Error al restablecer la contraseña: ${error.response?.data?.error || error.message}`);
      console.log(error.response?.data?.error || error.message, "este es el error ")
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
            {errors.new_password && <span>Este campo es requerido</span>}
            <input
            type="text"
            {...registerForm("new_password_confirm", { required: true })}
            placeholder="Confirmar contraseña"
            />
            {errors.new_password && <span>Este campo es requerido</span>}
        </div>
        <button className='button-reset-1' type="submit">Cambiar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p color='white'>{error}</p>}
    </div>
    </div>
  );
}

