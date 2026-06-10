import React, { useState } from "react";
import "./CadastrarAula.css";

const CadastrarAula = () => {

    const [aula, setAula] = useState({
        id_curso: "",
        titulo: "",
        descricao: "",
        ordem: "",
        conteudo_texto: "",
        url_video: "",
        duracao_minutos: "",
        status_aula: "publicada"
    });

    const cursos = [
        {
            id: 1,
            nome: "Legislação de Trânsito"
        },
        {
            id: 2,
            nome: "Direção Defensiva"
        },
        {
            id: 3,
            nome: "Primeiros Socorros"
        }
    ];

    const handleChange = (e) => {
        setAula({
            ...aula,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!aula.id_curso) {
            alert("Selecione um curso.");
            return;
        }

        if (!aula.titulo.trim()) {
            alert("Informe o título da aula.");
            return;
        }

        if (!aula.ordem) {
            alert("Informe a ordem da aula.");
            return;
        }

        if (
            aula.url_video &&
            !/^https?:\/\/.+/.test(aula.url_video)
        ) {
            alert("Informe uma URL válida.");
            return;
        }

        if (
            aula.duracao_minutos &&
            Number(aula.duracao_minutos) <= 0
        ) {
            alert("A duração deve ser maior que zero.");
            return;
        }

        console.log(aula);

        alert("Aula cadastrada com sucesso!");
    };

    return (
        <div className="cadastro-aula-container">

            <div className="card-aula">

                <h1>Cadastrar Aula Teórica</h1>

                <p className="subtitulo">
                    Cadastro de conteúdo educacional para os cursos da plataforma CNHFácil.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="section-title">
                        Curso Vinculado
                    </div>

                    <div className="form-group">
                        <label>Curso *</label>

                        <select
                            name="id_curso"
                            value={aula.id_curso}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Selecione um curso
                            </option>

                            {cursos.map((curso) => (
                                <option
                                    key={curso.id}
                                    value={curso.id}
                                >
                                    {curso.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="section-title">
                        Informações da Aula
                    </div>

                    <div className="form-group">
                        <label>Título *</label>

                        <input
                            type="text"
                            name="titulo"
                            value={aula.titulo}
                            onChange={handleChange}
                            placeholder="Digite o título da aula"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Descrição</label>

                        <textarea
                            name="descricao"
                            value={aula.descricao}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Descrição da aula"
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Ordem *</label>

                            <input
                                type="number"
                                name="ordem"
                                min="1"
                                value={aula.ordem}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Duração (minutos)</label>

                            <input
                                type="number"
                                min="1"
                                name="duracao_minutos"
                                value={aula.duracao_minutos}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="section-title">
                        Conteúdo
                    </div>

                    <div className="form-group">
                        <label>Conteúdo Textual</label>

                        <textarea
                            name="conteudo_texto"
                            value={aula.conteudo_texto}
                            onChange={handleChange}
                            rows="8"
                            placeholder="Digite o conteúdo da aula..."
                        />
                    </div>

                    <div className="form-group">
                        <label>URL do Vídeo</label>

                        <input
                            type="url"
                            name="url_video"
                            value={aula.url_video}
                            onChange={handleChange}
                            placeholder="https://youtube.com/..."
                        />
                    </div>

                    <div className="section-title">
                        Materiais Complementares
                    </div>

                    <div className="form-group">
                        <label>Arquivo de Slides</label>

                        <input
                            type="file"
                            accept=".ppt,.pptx,.pdf"
                        />
                    </div>

                    <div className="form-group">
                        <label>Arquivo PDF</label>

                        <input
                            type="file"
                            accept=".pdf"
                        />
                    </div>

                    <div className="form-group">
                        <label>Material Complementar</label>

                        <input
                            type="file"
                        />
                    </div>

                    <div className="form-group">
                        <label>Miniatura</label>

                        <input
                            type="file"
                            accept="image/*"
                        />
                    </div>

                    <div className="section-title">
                        Publicação
                    </div>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            name="status_aula"
                            value={aula.status_aula}
                            onChange={handleChange}
                        >
                            <option value="publicada">
                                Publicada
                            </option>

                            <option value="rascunho">
                                Rascunho
                            </option>

                            <option value="arquivada">
                                Arquivada
                            </option>
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
                            Salvar Aula
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CadastrarAula;