import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem('token_cnhfacil', dados.token);
        localStorage.setItem('usuario_nome', dados.usuario.nome);
        navigate('/'); // Redireciona para os cursos
      } else {
        setErro(dados.erro);
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        {/* Cabeçalho com Logo e Saudação */}
        <div className="login-header">
          <img src="/logo_cnh.jpg" alt="Logo CNHFácil" className="login-logo" />
          <p className="login-subtitle">Olá, futuro motorista!</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          
          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Digite seu e-mail"
              required 
            />
          </div>

          <div className="input-group">
            <div className="label-row">
              <label>Senha</label>
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="Digite sua senha"
              required 
            />
          </div>

          {erro && <p className="erro-mensagem">{erro}</p>}

          <button type="submit" className="btn-entrar">Entrar no Sistema</button>
        
        </form>

        {/* Rodapé */}
        <div className="login-footer">
          <p>Ainda não é aluno? <a href="#">Cadastre-se aqui</a></p>
        </div>

      </div>
    </div>
  );
}

export default Login;