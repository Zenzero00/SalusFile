import React, { useState, useEffect } from 'react';
import './citas.css';

const Citas = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medicos, setMedicos] = useState([]); // Lista de médicos
  const [newAppointment, setNewAppointment] = useState({
    id_paciente: '',
    id_medico: '',
    fecha_cita: '',
    estado: 'Programada',
    notas: '',
  });

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

  // Obtener pacientes desde el backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/pacientes');
        if (!response.ok) throw new Error('Error al obtener los pacientes');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPatients();
  }, []);

  // Obtener médicos desde el backend
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/medicos');
        if (!response.ok) throw new Error('Error al obtener los médicos');
        const data = await response.json();
        setMedicos(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMedicos();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (!response.ok) throw new Error('Error al crear la cita');

      await response.json();
      alert('Cita creada exitosamente');
      window.location.reload(); // Recarga la página para mostrar los datos actualizados
    } catch (error) {
      alert(error.message);
    }
  };

  // Manejar eliminación de citas
  const handleDeleteAppointment = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/citas/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error al cancelar la cita');

        setAppointments((prev) => prev.filter((app) => app.id_cita !== id));
        alert('Cita cancelada correctamente');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="main-content">
      <h1>Gestión de Citas</h1>

      {/* Formulario para nueva cita */}
      <form className="new-appointment-form" onSubmit={handleSubmit}>
        <h2>Crear Nueva Cita</h2>
        <label htmlFor="id_paciente">Paciente:</label>
        <select
          id="id_paciente"
          name="id_paciente"
          value={newAppointment.id_paciente}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un paciente</option>
          {patients.map((patient) => (
            <option key={patient.id_paciente} value={patient.id_paciente}>
              {patient.nombre} {patient.apellido}
            </option>
          ))}
        </select>

        <label htmlFor="id_medico">Médico:</label>
        <select
          id="id_medico"
          name="id_medico"
          value={newAppointment.id_medico}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un médico</option>
          {medicos.map((medico) => (
            <option key={medico.id_medico} value={medico.id_medico}>
              {medico.nombre} {medico.apellido}
            </option>
          ))}
        </select>

        <label htmlFor="fecha_cita">Fecha y Hora:</label>
        <input
          type="datetime-local"
          id="fecha_cita"
          name="fecha_cita"
          value={newAppointment.fecha_cita}
          onChange={handleChange}
          required
        />

        <label htmlFor="notas">Notas:</label>
        <textarea
          id="notas"
          name="notas"
          value={newAppointment.notas}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="submit-btn">Crear Cita</button>
      </form>

      {/* Tabla de citas */}
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Estado</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id_cita}>
              <td>{new Date(app.fecha_cita).toLocaleDateString()}</td>
              <td>{new Date(app.fecha_cita).toLocaleTimeString()}</td>
              <td>{app.nombre_paciente}</td>
              <td>{app.nombre_medico}</td>
              <td>{app.estado}</td>
              <td>{app.notas}</td>
              <td>
                <button className="cancel-btn" onClick={() => handleDeleteAppointment(app.id_cita)}>
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