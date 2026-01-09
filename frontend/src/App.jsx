import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginUsuario from "./pages/loginUsuario";
import RegistroUsuario from "./pages/RegistrarUsuario";
import LoginAdmin from "./pages/LoginAdmin";
import AdminUsuarios from "./pages/AdminUsuarios";
import DashboardUsuario from "./pages/paginaUsuario";
import CitaManual from "./pages/citaManual";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginUsuario />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/dashboard" element={<DashboardUsuario />} />
        <Route path="/cita-manual" element={<CitaManual />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;