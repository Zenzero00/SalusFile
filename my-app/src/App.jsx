import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Registro/Registro';
import Dashboard from './components/Dashboard/Dashboard';
import Historial from './components/Historial/Historial';
import Citas from './components/Citas/Citas';
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
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="historial" element={<Historial />} />
          <Route path="citas" element={<Citas />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;