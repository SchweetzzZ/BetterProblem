import './style.css'

export default function CadastroPage() {
    return (
        <div className="backGroundGeral">
            <div className="container">
                <form className="login-Form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" className="form-input"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input type="password" id="password" className="form-input"/>
                    </div>
                    <button type="submit" className="form-button">Cadastrar</button>
                <h1>Cadastro</h1>
                </form>
            </div>
        </div>
    )
}