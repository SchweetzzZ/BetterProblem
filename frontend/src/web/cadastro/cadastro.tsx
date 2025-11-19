import './style.css'
import { useState } from 'react'
import { register } from '../../auth/hooks'
import { useNavigate } from 'react-router-dom'

export default function CadastroPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            await register(email, password, name)
            navigate('/login')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="backGroundGeral">
            <div className="container">
                <form className="login-Form" onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>
                    
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* FALTAM ESTES INPUTS CONECTADOS */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="form-button" disabled={isLoading}>
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}