import React from 'react';
import './Loader.css';  // Importamos los estilos específicos

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="loader-ball">
        <div className="wave-container">
          <div className="wave"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;