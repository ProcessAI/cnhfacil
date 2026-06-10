import React, { useState } from "react";
import "./CadastrarCurso.css";

const CadastrarCurso = () => {
  const [curso, setCurso] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    tipo_cnh: "",
    modalidade: "",
    carga_horaria: "",
    quantidade_aulas: "",
    valor: "",
    imagem_capa: "",
    status_curso: "rascunho",
  });

  const handleChange = (e) => {
    setCurso({
      ...curso,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!curso.titulo.trim()) {
      alert("Informe o título do curso.");
      return;
    }

    if (!curso.categoria) {
      alert("Selecione a categoria.");
      return;
    }

    if (!curso.tipo_cnh) {
      alert("Selecione o tipo de CNH.");
      return;
    }

    if (!curso.modalidade) {
      alert("Selecione a modalidade.");
      return;
    }

    if (!curso.carga_horaria) {
      alert("Informe a carga horária.");
      return;
    }

    if (!curso.quantidade_aulas) {
      alert("Informe a quantidade de aulas.");
      return;
    }

    console.log(curso);

    alert("Curso cadastrado com sucesso!");
  };

  return (
    <div className="cadastro-curso-container">
      <div className="card-curso">
        <h1>Cadastrar Curso</h1>
        <p className="subtitulo">
          Cadastro de cursos teóricos da plataforma CNHFácil
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título do Curso *</label>
            <input
              type="text"
              name="titulo"
              value={curso.titulo}
              onChange={handleChange}
              placeholder="Digite o título do curso"
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={curso.descricao}
              onChange={handleChange}
              rows="4"
              placeholder="Descrição do curso"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoria *</label>
              <select
                name="categoria"
                value={curso.categoria}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="teorico">Teórico</option>
                <option value="simulado">Simulado</option>
                <option value="reciclagem">Reciclagem</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo CNH *</label>
              <select
                name="tipo_cnh"
                value={curso.tipo_cnh}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Modalidade *</label>
            <select
              name="modalidade"
              value={curso.modalidade}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="online">Online</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Carga Horária *</label>
              <input
                type="number"
                name="carga_horaria"
                value={curso.carga_horaria}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Quantidade de Aulas *</label>
              <input
                type="number"
                name="quantidade_aulas"
                value={curso.quantidade_aulas}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Valor (R$)</label>
            <input
              type="number"
              name="valor"
              value={curso.valor}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Imagem de Capa</label>
            <input
              type="file"
              accept="image/*"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status_curso"
              value={curso.status_curso}
              onChange={handleChange}
            >
              <option value="rascunho">Rascunho</option>
              <option value="publicado">Publicado</option>
              <option value="arquivado">Arquivado</option>
            </select>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="btn-cancelar"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-salvar"
            >
              Salvar Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarCurso;