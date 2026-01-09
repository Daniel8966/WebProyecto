import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginUsuario from "./pages/LoginUsuario";
import LoginAdmin from "./pages/LoginAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginUsuario />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;