import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginUsuario from "./pages/loginUsuario";
import RegistroUsuario from "./pages/RegistrarUsuario";
import LoginAdmin from "./pages/LoginAdmin";
import AdminUsuarios from "./pages/AdminUsuarios";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginUsuario />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/registro" element={<RegistroUsuario />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;