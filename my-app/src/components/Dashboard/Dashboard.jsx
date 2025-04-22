import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <h1>Bienvenido al Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>Próximas Citas</h3>
          <p>5</p>
        </div>
        <div className="stat-box">
          <h3>Pacientes Atendidos</h3>
          <p>120</p>
        </div>
        <div className="stat-box">
          <h3>Historiales Médicos</h3>
          <p>45</p>
        </div>
      </div>
      <button
        className="new-appointment"
        onClick={() => navigate('/citas')}
      >
        + Nueva Cita
      </button>
    </div>
  );
};

export default Dashboard;