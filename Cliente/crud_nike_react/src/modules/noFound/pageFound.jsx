import React from 'react';
import pagenot from '../../assets/pagenot.png'
import { useNavigate } from 'react-router-dom';
// import './NotFound.css';

export function NotFound (){
  const navigate= useNavigate();
  return (
<div className="flex items-center justify-center min-h-screen bg-white">
  <div className="relative p-8 text-center bg-gray-100 shadow-lg">
    <div className="absolute inset-0 transform -skew-y-6 bg-[#a0f0ed]"></div>
    <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-[130px] font-bold leading-none text-gray-800">404</h1>
      <img
        src={pagenot}
        alt="Shoe"
        className="w-[300px] h-[200px]"
        width="300"
        height="200"
        style={{ aspectRatio: '300 / 200', objectFit: 'cover' }}
      />
      <p className="text-lg">Pagina no encontrada</p>
      <button onClick={() => navigate('/home')} className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-6 py-3 text-sm font-semibold text-white bg-black">
        Volver
      </button>
    </div>
  </div>
</div>
  );
};

