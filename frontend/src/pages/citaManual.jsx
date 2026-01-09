import { useState } from "react";
import Nav from "../components/Nav";

function CitaManual() {
  const [autor, setAutor] = useState("");
  const [anio, setAnio] = useState("");
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [cita, setCita] = useState("");

  const generarCita = (e) => {
    e.preventDefault();

    const autorFinal = autor || "Autor desconocido";
    const anioFinal = anio || "s.f.";
    const tituloFinal = titulo || "Título no disponible";
    const urlFinal = url || "URL no disponible";

    const citaAPA = `${autorFinal} (${anioFinal}). ${tituloFinal}. Recuperado de ${urlFinal}`;

    setCita(citaAPA);
  };

  const copiarCita = () => {
    navigator.clipboard.writeText(cita);
    alert("Cita copiada al portapapeles");
  };

  return (
    <>
      <Nav />
        <div className="manual-cite-container">
        <h2>Generador de Cita APA Manual</h2>

        <form onSubmit={generarCita}>
          <input
            type="text"
            placeholder="Autor(es)"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />

          <input
            type="text"
            placeholder="Año de publicación"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
          />

          <input
            type="text"
            placeholder="Título del documento"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button type="submit">Generar cita</button>
        </form>

        {cita && (
          <div className="manual-citation-box">
            <p>{cita}</p>
            <button className="manual-copy-btn" onClick={copiarCita}>
              Copiar cita
            </button>
          </div>
        )}
      </div>

    </>
  );
}

export default CitaManual;
