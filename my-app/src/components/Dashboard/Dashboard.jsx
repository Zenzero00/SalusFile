import React, { useState } from 'react';
import './dashboard.css'; 

const Dashboard = () => {
  // Estado para controlar la visibilidad del modal de nueva cita
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Función para abrir el modal
  const openModal = () => setShowAppointmentModal(true);

  // Función para cerrar el modal
  const closeModal = () => setShowAppointmentModal(false);

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
              <a href="configuracion.html">Configuración</a>
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
        <h1>Bienvenido, Doctor</h1>
        <div className="dashboard-stats">
          <div className="stat-box">
            <h3>Próximas Citas</h3>
            <p>5</p>
          </div>
          <div className="stat-box">
            <h3>Pacientes Atendidos</h3>
            <p>120</p>
          </div>
        </div>
        {/* Botón para abrir el modal de nueva cita */}
        <button className="new-appointment" onClick={openModal}>
          + Nueva Cita
        </button>

        {/* Modal de nueva cita, renderizado condicional */}
        {showAppointmentModal && (
          <div
            className="modal"
            onClick={(e) => {
              // Cierra el modal si se hace clic en el fondo (no en el contenido)
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <div className="modal-content">
              <span className="close-btn" onClick={closeModal}>
                &times;
              </span>
              <h2>Agendar Nueva Cita</h2>
              <form id="appointmentForm">
                <label htmlFor="patientName">Nombre del Paciente:</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  required
                />

                <label htmlFor="appointmentDate">Fecha de la Cita:</label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  required
                />

                <label htmlFor="appointmentTime">Hora de la Cita:</label>
                <input
                  type="time"
                  id="appointmentTime"
                  name="appointmentTime"
                  required
                />

                <label htmlFor="reason">Motivo de la Cita:</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  required
                ></textarea>

                <button type="submit" className="submit-btn">
                  Agendar Cita
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;