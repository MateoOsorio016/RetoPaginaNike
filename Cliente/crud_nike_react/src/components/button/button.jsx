import React, { useRef, useEffect } from 'react';
import './button.css';

export const Button = ({ icon = null, onClick, fill = true, autoSize = true }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const handleButtonClick = (e) => {
      const circle = document.createElement('span');
      circle.classList.add('circle');

      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      e.target.appendChild(circle);
      setTimeout(() => circle.remove(), 500);
    };

    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleButtonClick);
    }

    return () => {
      if (btnRef.current) {
        btnRef.current.removeEventListener('click', handleButtonClick);
      }
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className={`btn--${fill ? 'filled' : 'outline'} btn--${autoSize ? 'auto' : 'fixed'}`}
      ref={btnRef}
    >
      {icon} {/* Renderiza el icono aquí */}
    </button>
  );
};
