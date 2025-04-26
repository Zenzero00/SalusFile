require('dotenv').config(); // Asegúrate de que esta línea esté presente al inicio del archivo
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); // Conexión a la base de datos

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
      SELECT 
        c.id_cita, 
        c.fecha_cita, 
        p.nombre AS nombre_paciente, 
        m.nombre AS nombre_medico, 
        c.estado, 
        c.notas
      FROM citas c
      JOIN pacientes p ON c.id_paciente = p.id_paciente
      JOIN medicos m ON c.id_medico = m.id_medico
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener las citas');
  }
});

// Ruta para crear una nueva cita
app.post('/api/citas', async (req, res) => {
  const { id_paciente, id_medico, fecha_cita, estado, notas } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO citas (id_paciente, id_medico, fecha_cita, estado, notas)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_paciente, id_medico, fecha_cita, estado || 'Programada', notas || '']
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
    const result = await pool.query('SELECT * FROM pacientes');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener los pacientes');
  }
});

// Ruta para obtener médicos
app.get('/api/medicos', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_medico, nombre, apellido FROM medicos');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener los médicos');
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ message: 'Conexión exitosa', time: result.rows[0] });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    res.status(500).json({ message: 'Error al conectar con la base de datos', error: error.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});