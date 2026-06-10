import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cursos from "./pages/Cursos/Cursos";
import CadastrarCurso from "./pages/CadastrarCurso/CadastrarCurso";
import CadastrarAula from "./pages/CadastrarAula/CadastrarAula";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Cursos />} />
        <Route path="/cadastrar-curso" element={<CadastrarCurso />} />
        <Route path="/cadastrar-aula" element={<CadastrarAula />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;