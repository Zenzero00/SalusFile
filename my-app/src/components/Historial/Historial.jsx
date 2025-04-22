import React, { useState, useEffect } from 'react';
import './historial.css';

const Historial = () => {
  const [historiales, setHistoriales] = useState([]);

  // Obtener historiales desde el backend
  useEffect(() => {
    const fetchHistoriales = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/historiales');
        if (!response.ok) throw new Error('Error al obtener los historiales médicos');
        const data = await response.json();
        setHistoriales(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchHistoriales();
  }, []);

  return (
    <div className="main-content">
      <h1>Historial Médico</h1>
      <button className="new-record" onClick={() => alert('Función no implementada aún')}>
        + Nuevo Registro Médico
      </button>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Enfermedad</th>
            <th>Fecha Diagnóstico</th>
            <th>Tratamiento</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {historiales.map((historial) => (
            <tr key={historial.id_historial}>
              <td>{historial.nombre_paciente}</td>
              <td>{historial.enfermedad}</td>
              <td>{new Date(historial.fecha_diagnostico).toLocaleDateString()}</td>
              <td>{historial.tratamiento}</td>
              <td>{historial.notas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historial;
