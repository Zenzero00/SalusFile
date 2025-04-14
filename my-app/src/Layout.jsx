import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Agregado Outlet
import './Layout.css';

const Layout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>SalusFile</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/citas">Citas</NavLink>
            </li>
            <li>
              <NavLink to="/historial">Historial Médico</NavLink>
            </li>
            <li>
              <NavLink to="/configuracion">Configuración</NavLink>
            </li>
            <li>
              <NavLink to="/login" className="logout">
                Cerrar sesión
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet /> {/* Renderiza las rutas hijas */}
      </main>
    </div>
  );
};

export default Layout;