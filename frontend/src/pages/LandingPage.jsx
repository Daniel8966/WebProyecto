import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
function LandingPage() {
  const navigate = useNavigate();

  return (

    <div className="landing-container">

      <div className="landing-card">
        <h1 className="landing-title">
          Sistema de Recuperación Académica para la Realización de Tesis e Investigaciones
        </h1>

        <p className="landing-subtitle">
          Plataforma académica para apoyar procesos de investigación y desarrollo de tesis
        </p>

        <div className="landing-buttons">
          <button
            className="btn usuario"
            onClick={() => navigate("/login")}
          >
            Entrar como Usuario
          </button>

          <button
            className="btn admin"
            onClick={() => navigate("/admin/login")}
          >
            Entrar como Administrador
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default LandingPage;
