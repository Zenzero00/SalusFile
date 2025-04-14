import React, { useState } from 'react';
import './citas.css';

const Citas = () => {
  // Estado con citas iniciales
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      appointmentDate: '2025-04-01',
      appointmentTime: '10:00 AM',
      patientName: 'Juan Pérez',
      reason: 'Consulta general'
    },
    {
      id: 2,
      appointmentDate: '2025-04-02',
      appointmentTime: '02:30 PM',
      patientName: 'María López',
      reason: 'Chequeo'
    }
  ]);

  // Estados para controlar modales
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Estado para los datos del formulario de "Nueva Cita"
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });

  // Estado para guardar la cita a editar
  const [currentEdit, setCurrentEdit] = useState(null);

  // Manejo del modal de "Nueva Cita"
  const openNewAppointmentModal = () => {
    setNewAppointment({ patientName: '', appointmentDate: '', appointmentTime: '', reason: '' });
    setShowAppointmentModal(true);
  };

  const closeNewAppointmentModal = () => {
    setShowAppointmentModal(false);
  };

  const handleNewAppointmentChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewAppointmentSubmit = (e) => {
    e.preventDefault();
    const newId = Date.now(); // Se usa Date.now() para generar un id único
    const newApp = { id: newId, ...newAppointment };
    setAppointments((prev) => [...prev, newApp]);
    setShowAppointmentModal(false);
  };

  // Manejo del modal de "Editar Cita"
  const openEditModal = (appointment) => {
    setCurrentEdit(appointment);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAppointments((prev) =>
      prev.map((app) => (app.id === currentEdit.id ? currentEdit : app))
    );
    alert('Cita actualizada correctamente');
    setShowEditModal(false);
  };

  // Manejo para eliminar una cita
  const handleDeleteAppointment = (id, patientName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la cita de ${patientName}?`)) {
      setAppointments((prev) => prev.filter((app) => app.id !== id));
    }
  };

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
              <a href="citas.html" className="active">
                Citas
              </a>
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
        <h1>Gestión de Citas</h1>
        <button className="new-appointment" onClick={openNewAppointmentModal}>
          + Nueva Cita
        </button>

        {/* Modal para Agendar Nueva Cita */}
        {showAppointmentModal && (
          <div
            className="modal"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeNewAppointmentModal();
            }}
          >
            <div className="modal-content">
              <span className="close-btn" onClick={closeNewAppointmentModal}>
                &times;
              </span>
              <h2>Agendar Nueva Cita</h2>
              <form id="appointmentForm" onSubmit={handleNewAppointmentSubmit}>
                <label htmlFor="patientName">Nombre del Paciente:</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  required
                  value={newAppointment.patientName}
                  onChange={handleNewAppointmentChange}
                />

                <label htmlFor="appointmentDate">Fecha de la Cita:</label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  required
                  value={newAppointment.appointmentDate}
                  onChange={handleNewAppointmentChange}
                />

                <label htmlFor="appointmentTime">Hora de la Cita:</label>
                <input
                  type="time"
                  id="appointmentTime"
                  name="appointmentTime"
                  required
                  value={newAppointment.appointmentTime}
                  onChange={handleNewAppointmentChange}
                />

                <label htmlFor="reason">Motivo de la Cita:</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  required
                  value={newAppointment.reason}
                  onChange={handleNewAppointmentChange}
                ></textarea>

                <button type="submit" className="submit-btn">
                  Agendar Cita
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal para Editar Cita */}
        {showEditModal && currentEdit && (
          <div
            className="modal"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeEditModal();
            }}
          >
            <div className="modal-content">
              <span className="close-btn" onClick={closeEditModal}>
                &times;
              </span>
              <h2>Editar Cita</h2>
              <form id="editAppointmentForm" onSubmit={handleEditSubmit}>
                <label htmlFor="editPatientName">Nombre del Paciente:</label>
                <input
                  type="text"
                  id="editPatientName"
                  name="patientName"
                  required
                  value={currentEdit.patientName}
                  onChange={handleEditChange}
                />

                <label htmlFor="editAppointmentDate">Fecha de la Cita:</label>
                <input
                  type="date"
                  id="editAppointmentDate"
                  name="appointmentDate"
                  required
                  value={currentEdit.appointmentDate}
                  onChange={handleEditChange}
                />

                <label htmlFor="editAppointmentTime">Hora de la Cita:</label>
                <input
                  type="time"
                  id="editAppointmentTime"
                  name="appointmentTime"
                  required
                  value={currentEdit.appointmentTime}
                  onChange={handleEditChange}
                />

                <label htmlFor="editReason">Motivo de la Cita:</label>
                <textarea
                  id="editReason"
                  name="reason"
                  rows="4"
                  required
                  value={currentEdit.reason}
                  onChange={handleEditChange}
                ></textarea>

                <button type="submit" className="submit-btn">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de Citas */}
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id}>
                <td>{app.appointmentDate}</td>
                <td>{app.appointmentTime}</td>
                <td>{app.patientName}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(app)}>
                    Editar
                  </button>
                  <button className="cancel-btn" onClick={() => handleDeleteAppointment(app.id, app.patientName)}>
                    Cancelar
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

export default Citas;