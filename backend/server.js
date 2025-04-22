// filepath: backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta para registrar usuarios
app.post('/api/register', async (req, res) => {
  const { email, password, rol, nombre_usuario } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (email, password, rol, nombre_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, password, rol, nombre_usuario]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') { // Código de error para duplicados en PostgreSQL
      res.status(400).send('El correo o nombre de usuario ya está registrado');
    } else {
      console.error(error.message);
      res.status(500).send('Error al registrar el usuario');
    }
  }
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario por correo y contraseña
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).json({ token: 'fake-jwt-token', rol: user.rol });
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al iniciar sesión');
  }
});

// Ruta para obtener citas
app.get('/api/citas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id_cita, c.fecha_cita, p.nombre AS nombre_paciente, c.notas AS motivo
      FROM citas c
      JOIN pacientes p ON c.id_paciente = p.id_paciente
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener las citas');
  }
});

// Ruta para obtener historiales médicos
app.get('/api/historiales', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT h.id_historial, p.nombre AS nombre_paciente, h.enfermedad, h.fecha_diagnostico, h.tratamiento, h.notas
      FROM historial_clinico h
      JOIN pacientes p ON h.id_paciente = p.id_paciente
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener los historiales médicos');
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});