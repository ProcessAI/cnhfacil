import React from 'react';
import './Cursos.css';

const Cursos = () => {
  // Lista de cursos disponíveis gerada via JavaScript
  const cursosDisponiveis = [
    {
      id: 1,
      icone: "⚖️",
      titulo: "Legislação de Trânsito",
      aulasFeitas: 12,
      aulasTotal: 15,
      progresso: 80
    },
    {
      id: 2,
      icone: "⚠️",
      titulo: "Direção Defensiva",
      aulasFeitas: 6,
      aulasTotal: 10,
      progresso: 60
    },
    {
      id: 3,
      icone: "🔧",
      titulo: "Noções de Mecânica",
      aulasFeitas: 1,
      aulasTotal: 5,
      progresso: 20
    }
  ];

  return (
    <div className="cursos-wrapper">
      
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
            <h1 className="topbar-title">Meus Cursos e Aulas</h1>
            <span className="topbar-subtitle">Plataforma de Ensino Premium</span>
          </div>
          <div className="topbar-right">
            <div className="user-profile">
              <div className="user-info">
                <div className="user-name">Duda</div>
                <div className="user-role">Aluno</div>
              </div>
              <div className="user-avatar">DU</div>
            </div>
          </div>
        </header>

        <div className="courses-container">
          {/* Mapeamento dinâmico dos cursos */}
          {cursosDisponiveis.map((curso) => (
            <div className="course-card" key={curso.id}>
              <div className="card-header">
                <div className="course-icon">{curso.icone}</div>
                <div className="course-badge">{curso.aulasFeitas}/{curso.aulasTotal} aulas</div>
              </div>
              
              <h3 className="course-title">{curso.titulo}</h3>
              
              <div className="progress-container">
                <div 
                  className="progress-fill" 
                  style={{ width: `${curso.progresso}%` }}
                ></div>
              </div>
              
              {/* Botão que faz o redirecionamento lógico para a tela de Aulas */}
              <a href="/aulas" className="btn-access">
                Acessar Aulas <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default Cursos;