import { useEffect, useState } from "react";
import api from "../api/api";
import Nav from "../components/Nav";

const eliminarUsuario = async (id) => {

  try {
    await api.delete(`/admin/${id}`);

    //  Refrescar página completa
    window.location.reload();

  } catch (error) {
    alert("Error al eliminar el usuario");
  }
};
function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

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

      <div className="form-container">
        <div className="form-card" style={{ width: "90%" }}>
          <h2>Usuarios Registrados</h2>

          {error && <p>{error}</p>}

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