import React, { useState, useEffect } from 'react';
import './pacientes.css';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        const response = await fetch('http://localhost:3001/api/pacientes', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        });
        if (!response.ok) throw new Error('Error al obtener los pacientes');
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPacientes();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(search.toLowerCase()) ||
    paciente.apellido.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pacientes-container">
      <h1>Gestión de Pacientes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido del paciente..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <table className="pacientes-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Sexo</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map((paciente) => (
            <tr key={paciente.id_paciente}>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
              <td>{paciente.fecha_nacimiento}</td>
              <td>{paciente.sexo}</td>
              <td>{paciente.telefono}</td>
              <td>{paciente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pacientes;