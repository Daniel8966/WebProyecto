import { useState } from "react";
import api from "../api/api";
import "../styles/admin.css";
import Nav from "../components/Nav";
export default function AdminDashboard() {
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const ejecutarPruebaSistema = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await api.get("/prueba/general");
      setResultado(res.data);
    } catch (err) {
      setError("Error al ejecutar la prueba del sistema");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
    <Nav/>
    <div className="admin-container">
      <h2>Panel de Administración</h2>

      <button
        className="btn-prueba"
        onClick={ejecutarPruebaSistema}
        disabled={cargando}
      >
        {cargando ? "Ejecutando prueba..." : "Ejecutar prueba del sistema"}
      </button>

      {error && <p className="error">{error}</p>}

      {resultado && (
        <div className="resultado-prueba">
          <h3>Resultado de la prueba</h3>

          <p><strong>Base de datos:</strong> {resultado.bd_conexion}</p>
          <p><strong>Total de usuarios:</strong> {resultado.total_usuarios}</p>
          <p><strong>Login prueba:</strong> {resultado.login_prueba}</p>
          <p><strong>OpenAlex:</strong> {resultado.openalex}</p>

          <hr />

          <p><strong>Título:</strong> {resultado.titulo}</p>
          <p><strong>Similitud:</strong> {resultado.similitud}</p>

          <p><strong>Cita APA:</strong></p>
          <blockquote>{resultado.cita_apa}</blockquote>
        </div>
      )}
    </div>

    </>
  );
}
