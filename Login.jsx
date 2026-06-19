import React, { useState } from 'react';
import './Login.css'; // Importação do arquivo de estilos separado

const Login = () => {
  // Estados para armazenar os dados digitados pelo usuário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função disparada ao clicar no botão "Entrar no Sistema"
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que a página recarregue
    
    // Aqui no futuro entrará a chamada para a sua API / Banco de Dados
    console.log('Tentativa de login com:', { email, password });
    
    // Simulação de redirecionamento para o painel inicial
    window.location.href = '/inicio'; 
  };

  return (
    <div className="login-page-wrapper">
      <main className="login-card">
        
        {/* Cabeçalho do Login */}
        <header className="login-header">
          <img src="https://i.postimg.cc/zbX1SvHr/image.png" alt="Logo CNH Fácil" className="login-logo" />
          <p className="login-subtitle">Olá, futuro motorista!</p>
        </header>

        {/* Formulário integrado com o React */}
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="email">E-mail</label>
            </div>
            <input 
              type="email" 
              id="email" 
              placeholder="Digite seu e-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Senha</label>
              <a href="/recuperar-senha" className="forgot-password">Esqueceu a senha?</a>
            </div>
            <input 
              type="password" 
              id="password" 
              placeholder="Digite sua senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-login">
            Entrar no Sistema
          </button>

        </form>

        {/* Área de Cadastro */}
        <div className="register-area">
          Ainda não é aluno? <a href="/cadastro" className="register-link">Cadastre-se aqui</a>
        </div>

      </main>
    </div>
  );
};

export default Login;