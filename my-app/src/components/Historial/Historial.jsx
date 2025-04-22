import React, { useState, useEffect } from 'react';
import './historial.css';

const Historial = () => {
  const [historiales, setHistoriales] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedHistorial, setSelectedHistorial] = useState(null); // Historial seleccionado para ver
  const [newHistorial, setNewHistorial] = useState({
    id_paciente: '',
    enfermedad: '',
    fecha_diagnostico: '',
    tratamiento: '',
    notas: '',
  });

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

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHistorial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/historiales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHistorial),
      });

      if (!response.ok) throw new Error('Error al crear el historial médico');

      await response.json();
      alert('Historial médico creado exitosamente');
      window.location.reload(); // Recarga la página para mostrar los datos actualizados
    } catch (error) {
      alert(error.message);
    }
  };

  // Manejar eliminación de un historial médico
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este historial médico?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/historiales/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error al eliminar el historial médico');

        setHistoriales((prev) => prev.filter((historial) => historial.id_historial !== id));
        alert('Historial médico eliminado correctamente');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Manejar la visualización de un historial médico
  const handleView = (historial) => {
    setSelectedHistorial(historial);
  };

  // Cerrar el modal
  const closeModal = () => {
    setSelectedHistorial(null);
  };

  return (
    <div className="main-content">
      <h1>Historial Médico</h1>

      {/* Formulario para nuevo historial médico */}
      <form className="new-historial-form" onSubmit={handleSubmit}>
        <h2>Crear Nuevo Historial Médico</h2>
        <label htmlFor="id_paciente">Paciente:</label>
        <select
          id="id_paciente"
          name="id_paciente"
          value={newHistorial.id_paciente}
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

        <label htmlFor="enfermedad">Enfermedad:</label>
        <input
          type="text"
          id="enfermedad"
          name="enfermedad"
          value={newHistorial.enfermedad}
          onChange={handleChange}
          required
        />

        <label htmlFor="fecha_diagnostico">Fecha de Diagnóstico:</label>
        <input
          type="date"
          id="fecha_diagnostico"
          name="fecha_diagnostico"
          value={newHistorial.fecha_diagnostico}
          onChange={handleChange}
          required
        />

        <label htmlFor="tratamiento">Tratamiento:</label>
        <input
          type="text"
          id="tratamiento"
          name="tratamiento"
          value={newHistorial.tratamiento}
          onChange={handleChange}
          required
        />

        <label htmlFor="notas">Notas:</label>
        <textarea
          id="notas"
          name="notas"
          value={newHistorial.notas}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="submit-btn">Crear Historial</button>
      </form>

      {/* Tabla de historiales */}
      <table className="patients-table">
        <thead>
          <tr>
            <th>Fecha Diagnóstico</th>
            <th>Paciente</th>
            <th>Enfermedad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {historiales.map((historial) => (
            <tr key={historial.id_historial}>
              <td>{new Date(historial.fecha_diagnostico).toLocaleDateString()}</td>
              <td>{historial.nombre_paciente}</td>
              <td>{historial.enfermedad}</td>
              <td>
                <button className="view-btn" onClick={() => handleView(historial)}>Ver</button>
                <button className="delete-btn" onClick={() => handleDelete(historial.id_historial)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para ver detalles del historial */}
      {selectedHistorial && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Detalles del Historial Médico</h2>
            <p><strong>Paciente:</strong> {selectedHistorial.nombre_paciente}</p>
            <p><strong>Enfermedad:</strong> {selectedHistorial.enfermedad}</p>
            <p><strong>Fecha de Diagnóstico:</strong> {new Date(selectedHistorial.fecha_diagnostico).toLocaleDateString()}</p>
            <p><strong>Tratamiento:</strong> {selectedHistorial.tratamiento}</p>
            <p><strong>Notas:</strong> {selectedHistorial.notas}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historial;
