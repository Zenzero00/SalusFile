import React, { useState } from 'react';
import './Registro.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rol: '',
    nombre_usuario: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('https://salus-file.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rol: formData.rol,
          nombre_usuario: formData.nombre_usuario,
        }),
      });

      if (!response.ok) throw new Error('Error al registrar el usuario');

      alert('Usuario registrado exitosamente');
      window.location.href = '/login';
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
          <input
            type="text"
            id="nombre_usuario"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Admin</option>
            <option value="medico">Médico</option>
            <option value="recepcionista">Recepcionista</option>
          </select>

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;