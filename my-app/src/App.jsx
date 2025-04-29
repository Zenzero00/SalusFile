import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Registro/Registro';
import Dashboard from './components/Dashboard/Dashboard';
import Pacientes from './components/Pacientes/Pacientes';
import Consultas from './components/Consultas/Consultas';
import Facturacion from './components/Facturacion/Facturacion';
import Seguimiento from './components/Seguimiento/Seguimiento';
import Configuracion from './components/Config/Configuracion';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Verifica si el usuario está autenticado

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirección inicial */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="consultas" element={<Consultas />} />
          <Route path="facturacion" element={<Facturacion />} />
          <Route path="seguimiento" element={<Seguimiento />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;