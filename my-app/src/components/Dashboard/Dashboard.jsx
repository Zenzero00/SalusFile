import React, { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    citas: 0,
    pacientes: 0,
    historiales: 0,
  });

  useEffect(() => {
    // Simulación de datos o llamada al backend para obtener estadísticas
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dashboard-stats');
        if (!response.ok) throw new Error('Error al obtener estadísticas');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>Próximas Citas</h3>
          <p>{stats.citas}</p>
        </div>
        <div className="stat-box">
          <h3>Pacientes Registrados</h3>
          <p>{stats.pacientes}</p>
        </div>
        <div className="stat-box">
          <h3>Historiales Médicos</h3>
          <p>{stats.historiales}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;