import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Nav from "../components/Nav";
import "../styles/adminUsuarios.css";

const eliminarUsuario = async (id) => {
  try {
    await api.delete(`/admin/${id}`);
    window.location.reload();
  } catch (error) {
    alert("Error al eliminar el usuario");
  }
};

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await api.get("/usuarios");
        setUsuarios(res.data);
      } catch (err) {
        setError("No se pudieron cargar los usuarios");
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <>
      <Nav />

      <div className="admin-container">
        <div className="admin-card">
          <div className="admin-header">
            <h2>Usuarios Registrados</h2>

            <button
              className="btn-prueba-sistema"
              onClick={() => navigate("/admin-dash")}
            >
              Prueba del sistema
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {usuarios.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => eliminarUsuario(u.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay usuarios</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminUsuarios;
