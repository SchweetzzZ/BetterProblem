import "./App.css";

function App() {
  // Adicione este console.log para verificar se o componente está renderizando
  console.log("App component is rendering");

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Bem-vindo de volta</h1>
        
        {/* Texto temporário para debug */}
        <div style={{ color: 'red', fontSize: '20px', marginBottom: '20px' }}>
          SE ISSO APARECER, O COMPONENTE ESTÁ FUNCIONANDO
        </div>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </div>

          <div className="login-footer">
            <a href="#" className="link">
              Esqueceu a senha?
            </a>
            <span> | </span>
            <a href="#" className="link">
              Criar conta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;