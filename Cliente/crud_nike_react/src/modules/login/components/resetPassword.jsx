import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../api/apilogin';
import { useNavigate } from 'react-router-dom';
import NikeLogo from '../../../assets/NikeLogo.png';
import { MdOutlineEmail } from "react-icons/md";
import { BeatLoader } from 'react-spinners';


import './reset.css';

export function ResetPasswordRequest() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await resetPassword(data);
      setEmail(data.email);
      setShowSuccess(true);
      setError('');

    } catch (error) {
      setShowSuccess(false);
      setError('Error al enviar el correo');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/loginPage');
  };

  return (
    <div className="container-reset">
      <div className="card-reset">
        {showSuccess ? (
          <>
            <MdOutlineEmail className="icon-reset" />
            <h2 className="title-reset">Revisa tu correo electrónico</h2>
            <p className="text-reset-p">Hemos enviado el enlace de restablecimiento a {email}</p>
            <button className="button-reset">Abrir email</button>
            <p className="text-reset-p">
              No recibiste el corrreo electrónico? <a className="link" href="">Haga click para reenviar</a>
            </p>
            <a className="link-reset" onClick={handleBackToLogin}>&larr; Volver al log in</a>
          </>
        ) : (
          <>
            <div className="container-1">
              <img className="img-reset" src={NikeLogo} alt="" />
              <h2 className="title-reset-1">Restablecer Contraseña</h2>
              <form className="form-reset-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="inputs-reset-1">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Correo Electrónico"
                  />
                  {errors.email && <span>Este campo es requerido</span>}
                </div>
                {loading ? (
  
                    <BeatLoader color ="white" className="loader-icon" />
                  
                ) : (
                  <button className="button-reset-1" type="submit">Enviar Correo</button>
                )}
              </form>
              {error && <p className="text-reset-1">{error}</p>}
            </div>
          </>
        )}
      </div>

    </div>
  );
}