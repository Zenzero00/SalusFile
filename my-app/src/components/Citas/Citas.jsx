import React, { useState, useEffect } from 'react';
import './citas.css';

const Citas = () => {
  const [appointments, setAppointments] = useState([]);

  // Obtener citas desde el backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/citas');
        if (!response.ok) throw new Error('Error al obtener las citas');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAppointments();
  }, []);

  // Manejo para eliminar una cita
  const handleDeleteAppointment = (id, patientName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la cita de ${patientName}?`)) {
      setAppointments((prev) => prev.filter((app) => app.id !== id));
    }
  };

  return (
    <div className="main-content">
      <h1>Gestión de Citas</h1>
      <button className="new-appointment" onClick={() => alert('Función no implementada aún')}>
        + Nueva Cita
      </button>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Motivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id_cita}>
              <td>{new Date(app.fecha_cita).toLocaleDateString()}</td>
              <td>{new Date(app.fecha_cita).toLocaleTimeString()}</td>
              <td>{app.nombre_paciente}</td>
              <td>{app.motivo}</td>
              <td>
                <button className="cancel-btn" onClick={() => handleDeleteAppointment(app.id, app.nombre_paciente)}>
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Citas;