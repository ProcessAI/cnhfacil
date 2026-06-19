import React, { useState } from 'react';
import './Administrador.css'; // Importa o arquivo de estilos isolado

const Administrador = () => {
  // ==========================================
  // LÓGICA DE ESTADO (REACT) E MOCK DATA
  // ==========================================
  
  // Estado que guarda o que o usuário digita na barra de pesquisa
  const [busca, setBusca] = useState('');

  // Banco de Dados Simulado de Alunos
  const alunosDb = [
    { 
      id: 1, nome: "Maria Eduarda Silva", cpf: "444.333.222-11", avatar: "DU", corAvatar: "var(--color-primary)", 
      categoria: "A e B", progresso: 45, veiculo: "Fiat Mobi (ABC-1234)", tipoVeiculo: "car", status: "Ativo" 
    },
    { 
      id: 2, nome: "João Carlos Mendes", cpf: "111.222.333-44", avatar: "JC", corAvatar: "#d97706", 
      categoria: "A (Moto)", progresso: 90, veiculo: "Honda CG (XYZ-9876)", tipoVeiculo: "motorcycle", status: "Ativo" 
    },
    { 
      id: 3, nome: "Lucas Tavares", cpf: "999.888.777-66", avatar: "LT", corAvatar: "#64748b", 
      categoria: "B (Carro)", progresso: 0, veiculo: "Aguardando início", tipoVeiculo: "none", status: "Pendente" 
    }
  ];

  // Lógica de Filtro: retorna apenas os alunos que batem com a busca (nome ou CPF)
  const alunosFiltrados = alunosDb.filter(aluno => 
    aluno.nome.toLowerCase().includes(busca.toLowerCase()) || 
    aluno.cpf.includes(busca)
  );

  // ==========================================
  // RENDERIZAÇÃO DA INTERFACE (JSX)
  // ==========================================
  return (
    <div className="admin-wrapper">
      
      {/* Menu Lateral (Sidebar) */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src="https://i.postimg.cc/zbX1SvHr/image.png" alt="Logo CNH Fácil" />
        </div>
        
        <div className="menu">
          <a href="/inicio" className="menu-item"><i className="fa-solid fa-house"></i> Início</a>
          <a href="/perfil" className="menu-item"><i className="fa-solid fa-user"></i> Perfil</a>
          <a href="/cursos" className="menu-item"><i className="fa-solid fa-graduation-cap"></i> Cursos</a>
          <a href="/simulados" className="menu-item"><i className="fa-solid fa-file-pen"></i> Simulados</a>
          <a href="/desempenho" className="menu-item"><i className="fa-solid fa-chart-simple"></i> Meu desempenho</a>
          {/* Aba ativa */}
          <a href="/admin" className="menu-item active danger" style={{ color: 'white', marginTop: '20px' }}>
            <i className="fa-solid fa-gear"></i> Admin/Config
          </a>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="main-content">
        
        <header className="topbar">
          <h1 className="topbar-title">Configurações Administrativas</h1>
          
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Administrador</div>
              <div className="user-role">Gestor Geral</div>
            </div>
            <div className="user-avatar">AD</div>
          </div>
        </header>

        <div className="admin-container">
          
          <div className="top-cards-grid">
            
            {/* Card Servidor */}
            <div className="admin-card">
              <div className="card-header" style={{ marginBottom: '20px' }}>
                <h3 className="card-title">Servidor e Banco de Dados</h3>
              </div>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Banco de Questões:</span>
                  <span className="info-value text-blue">1,240 Cadastradas</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Atualização Detran:</span>
                  <span className="info-value text-green">Junho 2026 - OK</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status da API (Integração):</span>
                  <span className="info-value text-green">Online</span>
                </div>
              </div>
            </div>

            {/* Card Conteúdos */}
            <div className="admin-card">
              <div className="card-header" style={{ marginBottom: '20px' }}>
                <h3 className="card-title">Controle de Conteúdos</h3>
              </div>
              <div className="content-list">
                <div className="content-item">
                  <div className="content-info">
                    <div className="content-icon"><i className="fa-solid fa-video"></i></div>
                    <div className="content-details">
                      <span className="content-name">Módulos e Vídeo-Aulas</span>
                      <span className="content-desc">Gerenciar acervo de vídeos</span>
                    </div>
                  </div>
                  <button className="btn-outline-primary">Acessar</button>
                </div>

                <div className="content-item">
                  <div className="content-info">
                    <div className="content-icon"><i className="fa-solid fa-list-check"></i></div>
                    <div className="content-details">
                      <span className="content-name">Banco de Questões</span>
                      <span className="content-desc">Adicionar/Editar simulados</span>
                    </div>
                  </div>
                  <button className="btn-outline-primary">Acessar</button>
                </div>
              </div>
            </div>

          </div>

          {/* Card Tabela de Alunos */}
          <div className="admin-card">
            <div className="card-header">
              <h3 className="card-title">Gestão de Alunos, Cursos e Veículos</h3>
              
              {/* Barra de Pesquisa com React */}
              <div className="search-bar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input 
                  type="text" 
                  placeholder="Buscar aluno por nome ou CPF..." 
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Aluno(a)</th>
                    <th>Categoria</th>
                    <th>Progresso Teórico</th>
                    <th>Veículo Prático Associado</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Geração Dinâmica da Tabela */}
                  {alunosFiltrados.map((aluno) => (
                    <tr key={aluno.id}>
                      <td>
                        <div className="student-cell">
                          <div className="student-avatar" style={{ color: aluno.corAvatar }}>{aluno.avatar}</div>
                          <div className="student-info">
                            <span className="student-name">{aluno.nome}</span>
                            <span className="student-doc">{aluno.cpf}</span>
                          </div>
                        </div>
                      </td>
                      <td className="category-text">{aluno.categoria}</td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${aluno.progresso}%` }}></div>
                          </div>
                          <span className="progress-text">{aluno.progresso}%</span>
                        </div>
                      </td>
                      <td>
                        {aluno.tipoVeiculo === 'none' ? (
                          <span className="vehicle-none">{aluno.veiculo}</span>
                        ) : (
                          <span className={`vehicle-badge vehicle-${aluno.tipoVeiculo === 'car' ? 'car' : 'moto'}`}>
                            <i className={`fa-solid fa-${aluno.tipoVeiculo}`}></i> {aluno.veiculo}
                          </span>
                        )}
                      </td>
                      <td>
                        <span className={`status-badge status-${aluno.status === 'Ativo' ? 'active' : 'pending'}`}>
                          {aluno.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-icon" title="Editar Aluno">
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Mensagem caso a busca não encontre nada */}
                  {alunosFiltrados.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                        Nenhum aluno encontrado com esse termo.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Administrador;