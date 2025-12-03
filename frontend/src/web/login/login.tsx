import { useState } from 'react'
import { login } from '../../auth/hooks' // ajuste o caminho conforme sua estrutura
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            await login(email, password)
            navigate('/') // Redireciona após login
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-gray-900 h-screen flex items-center justify-center">
            <div className="flex flex-col p-10 w-120 h-120 justify-between bg-gray-700 rounded-lg">
                <div className="flex justify-center">
                    <h1 className="text-black text-3xl font-bold">LOGIN</h1>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="text-white text-2xl block mb-2">Email</label>
                            <input className="rounded bg-white text-black w-70 h-9"
                                type="email" 
                                id="email"
                                placeholder='Digite seu email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="text-white text-2xl block mb-2">Senha</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="rounded bg-white text-black w-70 h-9"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button 
                            className="rounded bg-[#1f883d] text-black h-10 w-full"
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}