import React, { useState } from 'react';
import './Perfil.css';

const Perfil = () => {
  // ==========================================
  // DADOS DO ALUNO E ESTADOS DO FORMULÁRIO
  // ==========================================
  const [aluno, setAluno] = useState({
    nome: "Kaio Kevin Nunes dos Santos",
    email: "kaio.santos@email.com",
    cpf: "444.333.222-11",
    celular: "(61) 99999-9999",
    id: "#849.204",
    categoria: "A E B (CARRO/MOTO)",
    autoescola: {
      nome: "CFC Piloto Premium",
      unidade: "Centro - Bloco A",
      contato: "(11) 98888-7766"
    }
  });

  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // ==========================================
  // FUNÇÃO PARA SALVAR ALTERAÇÕES
  // ==========================================
  const handleSalvar = () => {
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    
    console.log("Salvando dados:", { 
      nome: aluno.nome, 
      email: aluno.email, 
      celular: aluno.celular,
      novaSenha: novaSenha 
    });
    
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="perfil-wrapper">
      
      {/* Menu Lateral (Sidebar) */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src="https://i.postimg.cc/zbX1SvHr/image.png" alt="Logo CNH Fácil" />
        </div>
        
        <div className="menu">
          <a href="/inicio" className="menu-item">
            <i className="fa-solid fa-house"></i> Início
          </a>
          <a href="/perfil" className="menu-item active">
            <i className="fa-solid fa-user"></i> Perfil
          </a>
          <a href="/cursos" className="menu-item">
            <i className="fa-solid fa-graduation-cap"></i> Cursos
          </a>
          <a href="/simulados" className="menu-item">
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
          <h1 className="topbar-title">Meu Perfil</h1>
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Kaio Kevin</div>
              <div className="user-role">Aluno</div>
            </div>
            <div className="user-avatar">KK</div>
          </div>
        </header>

        <div className="profile-container">
          
          {/* Coluna da Esquerda (Resumo e Info Adicional) */}
          <div className="profile-column-left">
            
            <div className="profile-card profile-summary">
              <div className="big-avatar">KK</div>
              <h2 className="profile-name">{aluno.nome}</h2>
              <p className="profile-id">Aluno ID: {aluno.id}</p>
              <span className="category-badge">CATEGORIA: {aluno.categoria}</span>
            </div>

            <div className="profile-card autoescola-info">
              <h4>Autoescola Vinculada</h4>
              <div className="autoescola-list">
                <div className="autoescola-item">
                  <i className="fa-regular fa-building"></i>
                  <span><strong>Nome:</strong> {aluno.autoescola.nome}</span>
                </div>
                <div className="autoescola-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <span><strong>Unidade:</strong> {aluno.autoescola.unidade}</span>
                </div>
                <div className="autoescola-item">
                  <i className="fa-solid fa-phone"></i>
                  <span><strong>Contato:</strong> {aluno.autoescola.contato}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Coluna da Direita (Formulários) */}
          <div className="profile-card forms-area">
            
            <div className="form-section">
              <div className="form-section-header">
                <h3 className="section-title">Informações Cadastrais</h3>
                <hr className="form-divider" />
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label>Nome Completo</label>
                  <input 
                    type="text" 
                    value={aluno.nome} 
                    onChange={(e) => setAluno({...aluno, nome: e.target.value})} 
                  />
                </div>
                <div className="input-group">
                  <label>E-mail</label>
                  <input 
                    type="email" 
                    value={aluno.email} 
                    onChange={(e) => setAluno({...aluno, email: e.target.value})} 
                  />
                </div>
                <div className="input-group">
                  <label>CPF</label>
                  <input type="text" value={aluno.cpf} disabled /> 
                </div>
                <div className="input-group">
                  <label>Celular/WhatsApp</label>
                  <input 
                    type="text" 
                    value={aluno.celular} 
                    onChange={(e) => setAluno({...aluno, celular: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-header">
                <h3 className="section-title">Segurança</h3>
                <hr className="form-divider" />
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label>Nova Senha</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-save" onClick={handleSalvar}>Salvar Alterações</button>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
};

export default Perfil;