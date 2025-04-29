import React, { useState, useEffect } from 'react';
import './consultas.css';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        const response = await fetch('http://localhost:3001/api/consultas', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        });
        if (!response.ok) throw new Error('Error al obtener las consultas');
        const data = await response.json();
        setConsultas(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchConsultas();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredConsultas = consultas.filter((consulta) =>
    consulta.nombre_paciente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="consultas-container">
      <h1>Consultas Médicas</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre del paciente..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <table className="consultas-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsultas.map((consulta) => (
            <tr key={consulta.id_consulta}>
              <td>{consulta.nombre_paciente}</td>
              <td>{consulta.nombre_medico}</td>
              <td>{consulta.fecha_consulta}</td>
              <td>{consulta.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Consultas;