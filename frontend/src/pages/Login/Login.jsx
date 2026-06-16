import Button from '../../components/ui/Button.jsx';

function Login() {
  return (
    <main className="auth-page">
      <form className="auth-form">
        <div>
          <p className="eyebrow">Acesso</p>
          <h1>Entrar</h1>
        </div>

        <label>
          Email
          <input type="email" name="email" autoComplete="email" />
        </label>

        <label>
          Senha
          <input type="password" name="password" autoComplete="current-password" />
        </label>

        <Button type="submit">Entrar</Button>
      </form>
    </main>
  );
}

export default Login;
