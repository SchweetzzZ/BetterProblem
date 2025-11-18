import './loginPage.css'

export function LoginPage() {
    return (
            <div className="backGroundGeral">
             <div className="container">
               <h1 className="titulo">LOGIN</h1>
               <form className="login-Form">
                 <div className="form-group">
                 <label htmlFor="email" className="form-label">Email</label>
                 <input type="email" id="email" className="form-input"/>
                 </div>
                 <div className="form-group">
                 <label htmlFor="password" className="form-label">Senha</label>
                 <input type="password" id="password" className="form-input"/>
                 </div>
                 <button type="submit" className="form-button">Entrar</button>
               </form>
             </div>
            </div>
    )
}
export default LoginPage