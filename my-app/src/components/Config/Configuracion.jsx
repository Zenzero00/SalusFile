import React from 'react';
import './configuracion.css';

const Configuracion = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>SalusFile</h2>
        <nav>
          <ul>
            <li>
              <a href="dashboard.html">Inicio</a>
            </li>
            <li>
              <a href="citas.html">Citas</a>
            </li>
            <li>
              <a href="historial.html">Historial Médico</a>
            </li>
            <li>
              <a href="configuracion.html" className="active">
                Configuración
              </a>
            </li>
            <li>
              <a href="login.html" className="logout">
                Cerrar sesión
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Configuración</h1>
        <form className="config-form">
          <label htmlFor="name">Nombre Completo</label>
          <input
            type="text"
            id="name"
            placeholder="Ingrese su nombre"
            required
          />

          <label htmlFor="specialty">Especialidad</label>
          <input
            type="text"
            id="specialty"
            placeholder="Ingrese su especialidad"
            required
          />

          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
            required
          />

          <label htmlFor="password">Nueva Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese nueva contraseña"
          />

          <label htmlFor="confirm-password">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirme nueva contraseña"
          />

          <button type="submit" className="save-btn">
            Guardar Cambios
          </button>
        </form>
      </main>
    </div>
  );
};

export default Configuracion;