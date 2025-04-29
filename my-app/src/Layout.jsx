import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="layout-container">
      {/* Barra lateral fija */}
      <aside className="sidebar">
        {/* Nombre de la aplicación */}
        <div className="app-name">SalusFile</div>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/pacientes">Pacientes</NavLink>
            </li>
            <li>
              <NavLink to="/consultas">Consultas</NavLink>
            </li>
            <li>
              <NavLink to="/facturacion">Facturación</NavLink>
            </li>
            <li>
              <NavLink to="/seguimiento">Seguimiento</NavLink>
            </li>
            <li>
              <NavLink to="/configuracion">Configuración</NavLink>
            </li>
            <li>
              <button className="logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        <Outlet /> {/* Renderiza el contenido de las rutas hijas */}
      </main>
    </div>
  );
};

export default Layout;