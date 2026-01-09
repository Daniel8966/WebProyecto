import { useState } from "react";
import api from "../api/api";

function LoginAdmin() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", { nombre, password });
      setMensaje(res.data.mensaje);
    } catch (err) {
      setMensaje(err.response?.data?.detail || "Acceso denegado");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Ingreso de Administrador</h2>

        <form onSubmit={iniciarSesion}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Usuario administrador"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="form-button admin" type="submit">
            Entrar
          </button>
        </form>

        <p className="form-message">{mensaje}</p>
      </div>
    </div>
  );
}

export default LoginAdmin;
