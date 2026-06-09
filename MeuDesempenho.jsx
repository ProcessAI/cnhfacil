import React from 'react';
import './MeuDesempenho.css'; // Importa o arquivo de estilos separado

const MeuDesempenho = () => {
  // ==========================================
  // LÓGICA E DADOS DINÂMICOS (MOCK DATA)
  // ==========================================

  const metricasGerais = {
    totalRespondidas: 360,
    respostasCorretas: "281 acertos",
    taxaAprovacao: "78.05%"
  };

  const taxaAcertos = [
    { id: 1, topico: "Legislação de Trânsito", percentual: 90, corBg: "bg-green" },
    { id: 2, topico: "Direção Defensiva", percentual: 75, corBg: "bg-blue" },
    { id: 3, topico: "Primeiros Socorros", percentual: 60, corBg: "bg-yellow" },
    { id: 4, topico: "Meio Ambiente e Mecânica", percentual: 45, corBg: "bg-red" }
  ];

  const evolucaoSimulados = [
    { id: 1, label: "Sim. 9", altura: "60%", score: "18/30", destaque: false },
    { id: 2, label: "Sim. 10", altura: "75%", score: "22/30", destaque: false },
    { id: 3, label: "Sim. 11", altura: "80%", score: "24/30", destaque: false },
    { id: 4, label: "Sim. 12", altura: "90%", score: "27/30", destaque: true }
  ];

  // ==========================================
  // RENDERIZAÇÃO DA INTERFACE (JSX)
  // ==========================================
  return (
    <div className="desempenho-wrapper">
      
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
          <a href="/simulados" className="menu-item">
            <i className="fa-solid fa-file-pen"></i> Simulados
          </a>
          {/* Aba ativa */}
          <a href="/desempenho" className="menu-item active">
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
          <h1 className="topbar-title">Meu Desempenho</h1>
          
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Duda</div>
              <div className="user-role">Aluno</div>
            </div>
            <div className="user-avatar">DU</div>
          </div>
        </header>

        <div className="dashboard-container">
          
          {/* Cartões Superiores */}
          <section className="metrics-grid">
            <div className="metric-card">
              <span className="metric-title">Total de questões respondidas</span>
              <span className="metric-value text-blue">{metricasGerais.totalRespondidas}</span>
            </div>
            
            <div className="metric-card">
              <span className="metric-title">Respostas corretas</span>
              <span className="metric-value text-green">{metricasGerais.respostasCorretas}</span>
            </div>
            
            <div className="metric-card">
              <span className="metric-title">Taxa geral de aprovação</span>
              <span className="metric-value text-yellow">{metricasGerais.taxaAprovacao}</span>
            </div>
          </section>

          {/* Seção de Gráficos Inferiores */}
          <section className="charts-grid">
            
            {/* Gráfico 1: Barras Horizontais (Tópicos) */}
            <div className="chart-card">
              <h3 className="card-heading">Taxa de Acertos por Tópico</h3>
              
              <div className="topic-list">
                {taxaAcertos.map((item) => (
                  <div className="topic-item" key={item.id}>
                    <div className="topic-header">
                      <span className="topic-name">{item.topico}</span>
                      <span className="topic-percent">{item.percentual}%</span>
                    </div>
                    <div className="topic-bar-bg">
                      <div 
                        className={`topic-bar-fill ${item.corBg}`} 
                        style={{ width: `${item.percentual}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico 2: Barras Verticais (Evolução) */}
            <div className="chart-card">
              <h3 className="card-heading">Evolução nos Últimos 4 Simulados</h3>
              
              <div className="bar-chart-container">
                <div className="chart-bars-area">
                  {evolucaoSimulados.map((item) => (
                    <div className="bar-group" key={item.id}>
                      <div 
                        className={`bar ${item.destaque ? 'highlight' : ''}`} 
                        style={{ height: item.altura }} 
                        data-score={item.score}
                      ></div>
                    </div>
                  ))}
                </div>
                
                <div className="chart-labels">
                  {evolucaoSimulados.map((item) => (
                    <span className="label" key={item.id}>{item.label}</span>
                  ))}
                </div>
                
                <p className="chart-caption">Passe o mouse por cima das barras para ver a pontuação exata.</p>
              </div>
            </div>

          </section>

        </div>
      </main>

    </div>
  );
};

export default MeuDesempenho;