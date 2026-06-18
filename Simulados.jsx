import React from 'react';
import './Simulados.css'; // Importa o arquivo de estilos separado

const Simulados = () => {
  // Dados dinâmicos extraídos do arquivo cursos_5.html
  const materias = [
    { id: 1, titulo: "Legislação de Trânsito", questoes: 10, icone: "fa-clipboard", cor: "#d97706", progresso: 80 },
    { id: 2, titulo: "Direção Defensiva", questoes: 10, icone: "fa-shield-halved", cor: "#3b82f6", progresso: 40 },
    { id: 3, titulo: "Primeiros Socorros", questoes: 10, icone: "fa-stethoscope", cor: "#8b5cf6", progresso: 0 },
    { id: 4, titulo: "Meio Ambiente e Cidadania", questoes: 10, icone: "fa-leaf", cor: "#22c55e", progresso: 100 },
    { id: 5, titulo: "Mecânica Básica", questoes: 10, icone: "fa-wrench", cor: "#94a3b8", progresso: 10 }
  ];

  return (
    <div className="simulados-wrapper">
      
      {/* Menu Lateral (Sidebar) */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src="https://i.postimg.cc/zbX1SvHr/image.png" alt="Logo CNH Fácil" />
        </div>
        
        <div className="menu">
          <a href="/inicio" className="menu-item">
            <i className="fa-solid fa-house"></i> Início
          </a>
          <a href="/perfil" className="menu-item">
            <i className="fa-solid fa-user"></i> Perfil
          </a>
          <a href="/cursos" className="menu-item">
            <i className="fa-solid fa-graduation-cap"></i> Cursos
          </a>
          {/* Item ativo nesta tela */}
          <a href="/simulados" className="menu-item active">
            <i className="fa-solid fa-file-pen"></i> Simulados
          </a>
          <a href="/desempenho" className="menu-item">
            <i className="fa-solid fa-chart-simple"></i> Meu desempenho
          </a>
          <a href="/admin" className="menu-item danger">
            <i className="fa-solid fa-gear"></i> Admin/Config
          </a>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="main-content">
        <header className="topbar">
          <h1 className="topbar-title">Simulados Disponíveis</h1>
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Duda</div>
              <div className="user-role">Aluno</div>
            </div>
            <div className="user-avatar">DU</div>
          </div>
        </header>

        <div className="simulados-container">
          
          {/* Banner Principal - Simulado Oficial */}
          <div className="hero-banner-simulado">
            <div className="banner-content">
              <span className="badge-recomendado">Recomendado</span>
              <h2 className="banner-title">Simulado Geral Oficial</h2>
              <p className="banner-text">
                Treine com 30 questões sorteadas idênticas às da prova real do DETRAN. Tempo limite de 30 minutos.
              </p>
            </div>
            <a href="/questoes" className="btn-start-large" id="btn-start-simulado">Iniciar Simulado Oficial</a>
          </div>

          <h3 className="section-title">Treinar por Matéria Específica</h3>
            
          {/* Grid de Matérias (Gerado via Map do React) */}
          <div className="simulados-grid">
            {materias.map((materia) => (
              <div className="subject-card" key={materia.id}>
                <div className="card-header">
                  <div className="subject-info">
                    <h3>{materia.titulo}</h3>
                    <p>{materia.questoes} questões</p>
                  </div>
                  <div className="subject-icon">
                    <i className={`fa-solid ${materia.icone}`} style={{ color: materia.cor }}></i>
                  </div>
                </div>
                
                <div className="progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Progresso de acertos</span>
                    <span className="progress-percent">{materia.progresso}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-fill" style={{ width: `${materia.progresso}%` }}></div>
                  </div>
                </div>
                
                <a href="/questoes" className="btn-outline">Praticar Questões</a>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Simulados;