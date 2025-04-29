import React, { useState, useEffect } from 'react';
import './seguimiento.css';

const Seguimiento = () => {
  const [seguimientos, setSeguimientos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulación de datos o llamada al backend para obtener seguimientos
    const fetchSeguimientos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/seguimientos'); // Cambia la URL según tu backend
        if (!response.ok) throw new Error('Error al obtener los seguimientos');
        const data = await response.json();
        setSeguimientos(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSeguimientos();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredSeguimientos = seguimientos.filter((seguimiento) =>
    seguimiento.paciente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="seguimiento-container">
      <h1>Seguimiento de Pacientes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre del paciente..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <table className="seguimiento-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredSeguimientos.map((seguimiento) => (
            <tr key={seguimiento.id}>
              <td>{seguimiento.paciente}</td>
              <td>{seguimiento.fecha}</td>
              <td>{seguimiento.descripcion}</td>
              <td>{seguimiento.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Seguimiento;