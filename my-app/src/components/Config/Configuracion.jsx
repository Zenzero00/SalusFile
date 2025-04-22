import React from 'react';
import './configuracion.css';

const Configuracion = () => {
  return (
    <div className="main-content">
      <h1>Configuración</h1>
      <form className="config-form">
        <label htmlFor="name">Nombre Completo</label>
        <input type="text" id="name" placeholder="Ingrese su nombre" required />

        <label htmlFor="specialty">Especialidad</label>
        <input type="text" id="specialty" placeholder="Ingrese su especialidad" required />

        <label htmlFor="email">Correo Electrónico</label>
        <input type="email" id="email" placeholder="Ingrese su correo electrónico" required />

        <label htmlFor="password">Nueva Contraseña</label>
        <input type="password" id="password" placeholder="Ingrese nueva contraseña" />

        <label htmlFor="confirm-password">Confirmar Contraseña</label>
        <input type="password" id="confirm-password" placeholder="Confirme nueva contraseña" />

        <button type="submit" className="save-btn">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Configuracion;