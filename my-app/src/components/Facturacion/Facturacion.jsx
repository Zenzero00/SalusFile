import React, { useState, useEffect } from 'react';
import './facturacion.css';

const Facturacion = () => {
  const [facturas, setFacturas] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        const response = await fetch('http://localhost:3001/api/facturas', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        });
        if (!response.ok) throw new Error('Error al obtener las facturas');
        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFacturas();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredFacturas = facturas.filter((factura) =>
    factura.cliente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="facturacion-container">
      <h1>Gestión de Facturación</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por cliente..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <table className="facturacion-table">
        <thead>
          <tr>
            <th>Número de Factura</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredFacturas.map((factura) => (
            <tr key={factura.id_factura}>
              <td>{factura.numero_factura}</td>
              <td>{factura.cliente}</td>
              <td>{factura.fecha}</td>
              <td>{factura.total}</td>
              <td>{factura.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Facturacion;