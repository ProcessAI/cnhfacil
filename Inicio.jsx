import React from 'react';
import './Inicio.css'; // Importação corrigida para Inicio.css

const Inicio = () => { // Nome do componente corrigido
  // ==========================================
  // LÓGICA / DADOS SIMULADOS (Mock Data)
  // No futuro, isso virá do seu Banco de Dados
  // ==========================================
  
  const aluno = {
    nome: "Kaio Kevin",
    papel: "Aluno",
    iniciais: "KK",
    progresso: 45
  };

  const estatisticas = [
    { titulo: "Aulas Assistidas", valor: "18 / 30", icone: "📺" },
    { titulo: "Simulados Feitos", valor: "12 Provas", icone: "📝" },
    { titulo: "Média de Acertos", valor: "78%", icone: "🎯" },
    { titulo: "Tempo de Estudo", valor: "14.5 horas", icone: "⏱️" }
  ];

  const historicoAtividades = [
    {
      id: 1,
      titulo: "Simulado Geral #12",
      data: "Hoje às 10:24",
      pontuacao: "24/30",
      status: "Aprovado",
      badgeClass: "badge-success"
    },
    {
      id: 2,
      titulo: "Legislação de Trânsito - Revisão",
      data: "Ontem",
      pontuacao: "27/30",
      status: "Aprovado",
      badgeClass: "badge-success"
    },
    {
      id: 3,
      titulo: "Direção Defensiva Avançado",
      data: "29 de Mai",
      pontuacao: "18/30",
      status: "Reprovado",
      badgeClass: "badge-danger"
    }
  ];

  // ==========================================
  // RENDERIZAÇÃO DA INTERFACE (JSX)
  // ==========================================
  return (
    <div className="inicio-wrapper"> {/* Classe corrigida */}
      
      {/* Menu Lateral (Sidebar) */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src="https://i.postimg.cc/zbX1SvHr/image.png" alt="Logo CNH Fácil" />
        </div>
        
        <div className="menu">
          <a href="/inicio" className="menu-item active">
            <i className="fa-solid fa-house"></i>
            Início
          </a>
          <a href="/perfil" className="menu-item">
            <i className="fa-solid fa-user"></i>
            Perfil
          </a>
          <a href="/cursos" className="menu-item">
            <i className="fa-solid fa-graduation-cap"></i>
            Cursos
          </a>
          <a href="/simulados" className="menu-item">
            <i className="fa-solid fa-file-pen"></i>
            Simulados
          </a>
          <a href="/desempenho" className="menu-item">
            <i className="fa-solid fa-chart-simple"></i>
            Meu desempenho
          </a>
          <a href="/admin" className="menu-item danger">
            <i className="fa-solid fa-gear"></i>
            Admin/Config
          </a>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="main-content">
        
        {/* Cabeçalho (Topbar) */}
        <header className="topbar">
          <h1 className="topbar-title">Painel do Aluno</h1>
          
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">{aluno.nome}</div>
              <div className="user-role">{aluno.papel}</div>
            </div>
            <div className="user-avatar">
              {aluno.iniciais}
            </div>
          </div>
        </header>

        {/* Conteúdo do Início */}
        <div className="dashboard-container">
          
          {/* Banner Principal */}
          <section className="hero-banner">
            <h2 className="hero-title">Olá, {aluno.nome}! 👋</h2>
            <p className="hero-subtitle">
              Bem-vindo de volta à sua plataforma. Você já completou {aluno.progresso}% do curso teórico.<br />
              Falta pouco para estar pronto para o exame oficial!
            </p>
            <div className="hero-actions">
              <a href="/aulas" className="btn btn-primary">Continuar Assistindo</a>
              <a href="/simulados" className="btn btn-secondary">Fazer Simulado</a>
            </div>
          </section>

          {/* Grid de Estatísticas (Gerado dinamicamente com .map) */}
          <section className="stats-grid">
            {estatisticas.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-info">
                  <p>{stat.titulo}</p>
                  <h3>{stat.valor}</h3>
                </div>
                <div className="stat-icon">{stat.icone}</div>
              </div>
            ))}
          </section>

          {/* Seção de Histórico (Gerado dinamicamente com .map) */}
          <section className="history-section">
            <h4>Histórico de atividade recente</h4>
            
            <div className="history-list">
              {historicoAtividades.map((item) => (
                <div className="history-item" key={item.id}>
                  <div className="history-item-top">
                    <div className="history-icon">
                      <i className="fa-regular fa-file-lines"></i>
                    </div>
                    <span className={`badge ${item.badgeClass}`}>{item.status}</span>
                  </div>
                  <div className="history-details">
                    <strong>{item.titulo}</strong>
                    <span>{item.data}</span>
                  </div>
                  <div className="history-item-bottom">
                    <span className="score-label">Pontuação:</span>
                    <span className="history-score">{item.pontuacao}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Inicio; // Exportação corrigida