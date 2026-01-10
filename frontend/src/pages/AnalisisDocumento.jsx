import { useState } from "react";
import api from "../api/api";
import "../styles/analisisDocumento.css";
import Nav from "../components/Nav";

export default function AnalisisDocumento() {
  const [texto, setTexto] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const analizarDocumento = async () => {
    if (!texto.trim()) return;

    setCargando(true);
    setError(null);

    try {
      const res = await api.post("/analisis/documento", {
        texto: texto
      });
      setResultados(res.data);
    } catch (err) {
      setError("Error al analizar el documento");
    } finally {
      setCargando(false);
    }
  };

  const copiarCita = (cita) => {
    navigator.clipboard.writeText(cita);
    alert("Cita copiada al portapapeles");
  };

  return (
    <>
      
      <Nav />

  
    <div className="analysis-container">
      <h2>Análisis de Documento</h2>

      <textarea
        placeholder="Pega aquí el fragmento de texto que escribiste..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={analizarDocumento} disabled={cargando}>
        {cargando ? "Analizando..." : "Analizar documento"}
      </button>

      {error && <p className="error-text">{error}</p>}

      <div className="results-grid">
        {resultados.map((doc, index) => (
          <div className="result-card" key={index}>
            <h3>{doc.titulo}</h3>

            <p><strong>Autores:</strong> {doc.autores.join(", ")}</p>
            <p><strong>Año:</strong> {doc.año}</p>

            <p className="abstract">
              <strong>Resumen:</strong> {doc.resumen}...
            </p>

            <p className="similarity">
              Similitud: {(doc.similitud * 100).toFixed(1)}%
            </p>

            {doc.link && (
              <a href={doc.link} target="_blank" rel="noreferrer">
                Ver fuente
              </a>
            )}

            <div className="citation-box">
              <p>{doc.cita_apa}</p>
              <button
                className="copy-btn"
                onClick={() => copiarCita(doc.cita_apa)}
              >
                Copiar cita
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      </>
  );
}
