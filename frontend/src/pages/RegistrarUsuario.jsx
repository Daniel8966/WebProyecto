import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Nav from "../components/Nav";


function RegistroUsuario() {
    
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const registrar = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/usuarios", {
        nombre,
        password,
      });
      setMensaje(res.data.mensaje);

      // regresar al login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMensaje(err.response?.data?.detail || "Error al registrar usuario");
    }
  };

  return (
    <>
      <Nav />
      <div className="form-container">
        <div className="form-card">
          <h2>Registro de Usuario</h2>

          <form onSubmit={registrar}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="form-button usuario" type="submit">
              Registrarse
            </button>
          </form>

          <p className="form-message">{mensaje}</p>
        </div>
      </div>
    </>
  );
}

export default RegistroUsuario;
