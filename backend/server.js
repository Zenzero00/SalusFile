const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Acceso denegado');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega el usuario al objeto de la solicitud
    next();
  } catch (error) {
    res.status(403).send('Token inválido');
  }
};

// Ruta para registrar usuarios
app.post('/api/register', async (req, res) => {
  const { nombre_usuario, email, password, rol, id_medico } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO usuarios (nombre_usuario, email, password, rol, id_medico) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre_usuario, email, password, rol, id_medico || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') { // Código de error para duplicados en PostgreSQL
      res.status(400).send('El nombre de usuario o correo ya está registrado');
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
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const token = jwt.sign(
        { id_usuario: user.id_usuario, rol: user.rol },
        process.env.JWT_SECRET || 'defaultsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error en /api/login:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para obtener citas
app.get('/api/citas', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        c.id_cita, 
        p.nombre AS nombre_paciente, 
        p.apellido AS apellido_paciente, 
        m.nombre AS nombre_medico, 
        m.apellido AS apellido_medico, 
        c.fecha_cita, 
        c.estado, 
        c.notas 
      FROM citas c
      JOIN pacientes p ON c.id_paciente = p.id_paciente
      JOIN medicos m ON c.id_medico = m.id_medico
      WHERE c.id_usuario = $1`,
      [req.user.id_usuario]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las citas:', error.message);
    res.status(500).send('Error al obtener las citas');
  }
});

// Ruta para crear una nueva cita
app.post('/api/citas', authenticateToken, async (req, res) => {
  const { id_paciente, id_medico, fecha_cita, estado, notas } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO citas (id_paciente, id_medico, fecha_cita, estado, notas, id_usuario)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_paciente, id_medico, fecha_cita, estado || 'Programada', notas || '', req.user.id_usuario]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al crear la cita');
  }
});

// Ruta para actualizar una cita
app.put('/api/citas/:id', async (req, res) => {
  const { id } = req.params;
  const { estado, notas } = req.body;

  try {
    const result = await pool.query(
      `UPDATE citas SET estado = $1, notas = $2 WHERE id_cita = $3 RETURNING *`,
      [estado, notas, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send('Cita no encontrada');
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al actualizar la cita');
  }
});

// Ruta para eliminar una cita
app.delete('/api/citas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM citas WHERE id_cita = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Cita no encontrada');
    }
    res.status(200).json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al eliminar la cita');
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

// Ruta para crear un nuevo historial médico
app.post('/api/historiales', async (req, res) => {
  const { id_paciente, enfermedad, fecha_diagnostico, tratamiento, notas } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO historial_clinico (id_paciente, enfermedad, fecha_diagnostico, tratamiento, notas)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_paciente, enfermedad, fecha_diagnostico, tratamiento, notas || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al crear el historial médico');
  }
});

// Ruta para eliminar un historial médico
app.delete('/api/historiales/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM historial_clinico WHERE id_historial = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Historial médico no encontrado');
    }
    res.status(200).json({ message: 'Historial médico eliminado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al eliminar el historial médico');
  }
});

// Ruta para obtener pacientes
app.get('/api/pacientes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id_paciente, 
        nombre, 
        apellido, 
        fecha_nacimiento, 
        sexo, 
        direccion, 
        telefono, 
        email, 
        fecha_registro 
      FROM pacientes
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los pacientes:', error.message);
    res.status(500).send('Error al obtener los pacientes');
  }
});

// Ruta para obtener médicos
app.get('/api/medicos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id_medico, 
        nombre, 
        apellido, 
        especialidad, 
        telefono, 
        email, 
        num_colegiado, 
        fecha_registro 
      FROM medicos
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los médicos:', error.message);
    res.status(500).send('Error al obtener los médicos');
  }
});

// Ruta para obtener estadísticas del dashboard
app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const citasResult = await pool.query('SELECT COUNT(*) AS total FROM citas');
    const pacientesResult = await pool.query('SELECT COUNT(*) AS total FROM pacientes');
    const historialesResult = await pool.query('SELECT COUNT(*) AS total FROM historial_clinico');

    res.json({
      citas: parseInt(citasResult.rows[0].total, 10),
      pacientes: parseInt(pacientesResult.rows[0].total, 10),
      historiales: parseInt(historialesResult.rows[0].total, 10),
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error.message);
    res.status(500).send('Error al obtener estadísticas');
  }
});

// Ruta para obtener seguimientos
app.get('/api/seguimientos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id_seguimiento, 
        paciente, 
        fecha, 
        descripcion, 
        estado 
      FROM seguimientos
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los seguimientos:', error.message);
    res.status(500).send('Error al obtener los seguimientos');
  }
});

// Ruta para obtener facturas
app.get('/api/facturas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        f.id_factura, 
        p.nombre AS nombre_paciente, 
        p.apellido AS apellido_paciente, 
        f.monto, 
        f.fecha_emision, 
        f.estado 
      FROM facturacion f
      JOIN pacientes p ON f.id_paciente = p.id_paciente
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las facturas:', error.message);
    res.status(500).send('Error al obtener las facturas');
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});