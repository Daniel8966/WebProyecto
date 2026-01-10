import { useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

const generarCitaAPA = (doc) => {
  const autores =
    doc.autores.length > 0
      ? doc.autores.join(", ")
      : "Autor desconocido";

  const año = doc.año || "s.f.";
  const titulo = doc.titulo || "Título no disponible";
  const link = doc.link || "URL no disponible";

  return `${autores} (${año}). ${titulo}. Recuperado de ${link}`;
};


function DashboardUsuario() {
  const navigate = useNavigate();
  const [citaVisible, setCitaVisible] = useState(null);

  const [tema, setTema] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarDocumentos = async () => {
    if (!tema.trim()) return;

    setLoading(true);
    setResultados([]);

    try {
      const response = await fetch(
        `http://localhost:8000/recomendaciones?tema=${encodeURIComponent(tema)}`
      );

      const data = await response.json();
      setResultados(data);
    } catch (error) {
      console.error("Error al buscar documentos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />

      <div className="dashboard-container">
        <h1>Sistema de Recuperación Académica</h1>
        <p>Ingresa un tema para recibir documentos de apoyo</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Ej. Inteligencia artificial en educación"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
          />
          <button onClick={buscarDocumentos}>Buscar</button>
          <button
          className="manual-cite-btn"
          onClick={() => navigate("/cita-manual")}>
          Cita manual
        </button>
        <button onClick={() => navigate("/analisis-documento")}>
          Analizar documento
        </button>
        </div>

        {loading && <p>Buscando documentos...</p>}

        <div className="results-grid">
          {resultados.map((doc, index) => (
                <div className="result-card" key={index}>
                  <h3>{doc.titulo}</h3>

                  <p><strong>Año:</strong> {doc.año || "N/A"}</p>
                  <p><strong>Autores:</strong> {doc.autores.join(", ")}</p>

                  <p className="abstract">
                    {doc.abstract
                      ? doc.abstract.slice(0, 200) + "..."
                      : "Resumen no disponible"}
                  </p>

                  <p><strong>Similitud:</strong> {doc.similitud.toFixed(3)}</p>

                  {doc.link && (
                    <a href={doc.link} target="_blank" rel="noreferrer">
                      Ver documento
                    </a>
                  )}

                  <button
                    className="cite-btn"
                    onClick={() => setCitaVisible(generarCitaAPA(doc))}
                  >
                    📚 Citar esta fuente
                  </button>

                  {citaVisible === generarCitaAPA(doc) && (
                    <div className="citation-box">
                      {citaVisible}
                    </div>
                  )}
                </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardUsuario;
