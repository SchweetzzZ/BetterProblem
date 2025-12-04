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
        <div className="bg-[#0D1117] h-screen flex items-center justify-center">
            <div className="bg-[#1A1F24] flex flex-col h-120 w-120 p-10 justify-between">
                <div className="flex justify-center">
                    <h1 className="text-center text-white text-3xl font-bold">CADASTRO</h1>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="text-gray-200 text-2xl block mb-2">Nome</label>
                            <input 
                                className="w-70 h-12 px-4 bg-[#2D333B] border border-gray-600 rounded-lg 
                        text-white text-base placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200
                        hover:border-gray-500"
                                placeholder="Digite seu nome"
                                type="text" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="text-gray-200 text-2xl block mb-2">Email</label>
                        <input 
                            className="w-70 h-12 px-4 bg-[#2D333B] border border-gray-600 rounded-lg 
                        text-white text-base placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200
                        hover:border-gray-500"
                            placeholder="Digite seu email"
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="text-gray-200 text-2xl block mb-2">Senha</label>
                        <input 
                            className="w-70 h-12 px-4 bg-[#2D333B] border border-gray-600 rounded-lg 
                        text-white text-base placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200
                        hover:border-gray-500"
                            placeholder="Digite sua senha"
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button className="rounded bg-[#238636] hover:bg-[#2ea043] transition text-white h-10 w-full font-semibold" type="submit" disabled={isLoading}>
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    </div>
    )
}