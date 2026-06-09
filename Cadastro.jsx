import React, { useState } from 'react';
import './Cadastro.css'; // Importando o CSS

const Cadastro = () => {
  // Estados do React para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função para lidar com o clique em "Realizar Cadastro"
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recarregar a página
    
    if (senha !== confirmarSenha) {
      alert("As senhas digitadas não coincidem!");
      return;
    }

    console.log('Novo aluno cadastrado:', { nome, cpf, email, senha });
    
    // Após salvar, redireciona para o login
    window.location.href = '/login';
  };

  return (
    <div className="register-page-wrapper">
      <main className="register-card">
        
        <header className="register-header">
          <img src="https://i.postimg.cc/zbX1SvHr/image.png" alt="Logo CNH Fácil" className="register-logo" />
          <p className="register-subtitle">Crie sua conta para começar a estudar</p>
        </header>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="nome">Nome Completo</label>
            </div>
            <input 
              type="text" 
              id="nome" 
              placeholder="Ex: João da Silva" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="cpf">CPF</label>
            </div>
            <input 
              type="text" 
              id="cpf" 
              placeholder="000.000.000-00" 
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="email">E-mail</label>
            </div>
            <input 
              type="email" 
              id="email" 
              placeholder="Digite seu melhor e-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="senha">Senha</label>
              </div>
              <input 
                type="password" 
                id="senha" 
                placeholder="Crie uma senha" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="confirmar_senha">Confirmar Senha</label>
              </div>
              <input 
                type="password" 
                id="confirmar_senha" 
                placeholder="Repita a senha" 
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-register">
            Realizar Cadastro
          </button>

        </form>

        <div className="login-area">
          Já é aluno da autoescola? <a href="/login" className="login-link">Faça login aqui</a>
        </div>

      </main>
    </div>
  );
};

export default Cadastro;