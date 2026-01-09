import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  return (
    <nav className="nav-container">
      <button className="nav-back" onClick={() => navigate(-1)}>
        ⬅ Regresar
      </button>
    </nav>
  );
}

export default Nav;