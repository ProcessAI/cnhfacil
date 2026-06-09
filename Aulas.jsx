import React, { useState } from 'react';
import './Aulas.css';

const Aulas = () => {
  const [playlist] = useState([
    { id: 1, titulo: "1. Posicionamento preventivo", status: "done", icon: "fa-check" },
    { id: 2, titulo: "2. Condições adversas", status: "active", icon: "fa-play" },
    { id: 3, titulo: "3. Ações corretivas", status: "locked", icon: "fa-lock" }
  ]);

  return (
    <div className="aulas-wrapper">
      
      <aside className="sidebar">
        <div className="logo-container">
          <img src="https://i.postimg.cc/zbX1SvHr/image.png" alt="Logo CNH Fácil" />
        </div>
        <div className="menu">
          <a href="/cursos" className="menu-item active">
            <i className="fa-solid fa-graduation-cap"></i> Cursos
          </a>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            {/* Botão de retorno fechando o fluxo para a tela de Cursos */}
            <a href="/cursos" className="btn-back" title="Voltar para a lista de Cursos">
              <i className="fa-solid fa-arrow-left"></i> Voltar
            </a>
            <h1 className="topbar-title">Vídeo-Aulas Teóricas</h1>
          </div>
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Duda</div>
              <div className="user-role">Aluno</div>
            </div>
            <div className="user-avatar">DU</div>
          </div>
        </header>

        <div className="lesson-container">
          
          <div className="video-wrapper">
            <div className="video-title-overlay">
              Assistindo agora: Módulo 2 - Aula 2: Condições adversas
            </div>
            <div className="play-button-large">
              <i className="fa-solid fa-play"></i>
            </div>
          </div>

          <aside className="playlist-card">
            <div className="playlist-header">
              <h3>Aulas do Módulo</h3>
            </div>
            
            <div className="playlist-list">
              {playlist.map((aula) => (
                <div key={aula.id} className={`playlist-item item-${aula.status}`}>
                  <i className={`fa-solid ${aula.icon}`}></i>
                  {aula.titulo}
                </div>
              ))}
            </div>

            {/* Ação de concluir que retorna à listagem */}
            <a href="/cursos" className="btn-concluir">
              Concluir esta aula
            </a>
          </aside>

        </div>
      </main>

    </div>
  );
};

export default Aulas;