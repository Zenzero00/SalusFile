import React, { useState } from 'react';
import './historial.css'; 
const Historial = () => {
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Datos simulados de pacientes
  const pacientes = {
    "Juan Pérez": {
      nombre: "Juan Pérez",
      edad: 45,
      especialidad: "Cardiología",
      enfermedadesPrevias: "Hipertensión",
      alergias: "Ninguna",
      medicamentos: "Losartán 50mg",
      vacunas: "COVID-19, Influenza",
      antecedentesFamiliares: "Historial de hipertensión en la familia",
      habitos: "No fuma, hace ejercicio regularmente",
    },
    "María López": {
      nombre: "María López",
      edad: 38,
      especialidad: "Cardiología",
      enfermedadesPrevias: "Asma",
      alergias: "Polen, penicilina",
      medicamentos: "Salbutamol",
      vacunas: "COVID-19, Hepatitis B",
      antecedentesFamiliares: "Historial de asma en la familia",
      habitos: "No fuma, hace ejercicio moderado",
    },
  };

  // Función para abrir el modal de registro médico
  const handleOpenRecordModal = () => setShowRecordModal(true);

  // Función para cerrar el modal de registro médico
  const handleCloseRecordModal = () => setShowRecordModal(false);

  // Función para abrir el modal de visualización del historial médico
  const handleViewModal = (pacienteNombre) => {
    setSelectedPatient(pacientes[pacienteNombre] || null);
    setShowViewModal(true);
  };

  // Función para cerrar el modal de visualización
  const handleCloseViewModal = () => {
    setSelectedPatient(null);
    setShowViewModal(false);
  };

  // Función para eliminar un paciente
  const handleDeletePatient = (pacienteNombre) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar el historial de ${pacienteNombre}?`
    );
    if (confirmacion) {
      console.log(`Historial de ${pacienteNombre} eliminado.`);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>SalusFile</h2>
        <nav>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#citas">Citas</a></li>
            <li><a href="#historial" className="active">Historial Médico</a></li>
            <li><a href="#configuracion">Configuración</a></li>
            <li><a href="#login" className="logout">Cerrar sesión</a></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Historial Médico</h1>
        <button className="new-record" onClick={handleOpenRecordModal}>
          + Nuevo Registro Médico
        </button>

        {/* Modal de Registro Médico */}
        {showRecordModal && (
          <div className="modal" onClick={(e) => e.target.classList.contains('modal') && handleCloseRecordModal()}>
            <div className="modal-content">
              <span className="close-btn" onClick={handleCloseRecordModal}>
                &times;
              </span>
              <h2>Formulario de Registro Médico</h2>
              {/* Aquí podrías colocar tu formulario */}
              <p>Contenido del formulario...</p>
            </div>
          </div>
        )}

        {/* Modal para Ver Historial Médico */}
        {showViewModal && selectedPatient && (
          <div className="modal" onClick={(e) => e.target.classList.contains('modal') && handleCloseViewModal()}>
            <div className="modal-content">
              <span className="close-btn" onClick={handleCloseViewModal}>
                &times;
              </span>
              <h2>Historial Médico del Paciente</h2>
              <div id="historialContent">
                <p><strong>Nombre:</strong> {selectedPatient.nombre}</p>
                <p><strong>Edad:</strong> {selectedPatient.edad} años</p>
                <p><strong>Especialidad:</strong> {selectedPatient.especialidad}</p>
                <p><strong>Enfermedades Previas:</strong> {selectedPatient.enfermedadesPrevias}</p>
                <p><strong>Alergias:</strong> {selectedPatient.alergias}</p>
                <p><strong>Medicamentos Actuales:</strong> {selectedPatient.medicamentos}</p>
                <p><strong>Vacunas:</strong> {selectedPatient.vacunas}</p>
                <p><strong>Antecedentes Familiares:</strong> {selectedPatient.antecedentesFamiliares}</p>
                <p><strong>Hábitos:</strong> {selectedPatient.habitos}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de pacientes */}
        <table className="patients-table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Edad</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(pacientes).map((pacienteNombre) => (
              <tr key={pacienteNombre}>
                <td>{pacienteNombre}</td>
                <td>{pacientes[pacienteNombre].edad}</td>
                <td>{pacientes[pacienteNombre].especialidad}</td>
                <td>
                  <button className="view-btn" onClick={() => handleViewModal(pacienteNombre)}>
                    Ver
                  </button>
                  <button className="delete-btn" onClick={() => handleDeletePatient(pacienteNombre)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Historial;
