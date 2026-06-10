import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cursos from "./pages/Cursos/Cursos";
import CadastrarCurso from "./pages/CadastrarCurso/CadastrarCurso";
import CadastrarAula from "./pages/CadastrarAula/CadastrarAula";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cursos />} />
        <Route path="/cadastrar-curso" element={<CadastrarCurso />} />
        <Route path="/cadastrar-aula" element={<CadastrarAula />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;