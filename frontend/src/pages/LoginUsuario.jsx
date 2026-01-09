import { useState } from "react";
import api from "../api/api";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";


function LoginUsuario() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/usuarios/login", { nombre, password });
      setMensaje(res.data.mensaje);
      if (res.data.mensaje == "Login exitoso"){
          navigate("/dashboard");

      }
    } catch (err) {
      setMensaje(err.response?.data?.detail || "Error al iniciar sesión");
    }
  };

  return (
    <div> 
      <Nav/>
    <div className="form-container">
      <div className="form-card">
        <h2>Ingreso de Usuario</h2>

        <form onSubmit={iniciarSesion}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre de usuario"
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

          <button className="form-button usuario" type="submit">
            Entrar
          </button>
        </form>

        <p className="form-message">{mensaje}</p>
          <div className="form-footer">
            ¿No tienes cuenta?{" "}
            <span onClick={() => navigate("/registro")}>
              Registrarse
            </span>
          </div>
      </div>
    </div>
  </div>
  );
}

export default LoginUsuario;
