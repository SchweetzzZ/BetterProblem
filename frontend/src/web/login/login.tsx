import { useState } from 'react'
import { login } from '../../auth/hooks' 
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
            navigate('/')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-[#0D1117] h-screen flex items-center justify-center">
            <div className="flex flex-col p-10 w-120 h-120 justify-between bg-[#1A1F24] rounded-lg">
                <div className="flex justify-center">
                    <h1 className="text-white text-3xl font-bold">LOGIN</h1>
                </div>

        <div className="flex-1 flex items-center justify-center">
            <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <label htmlFor="email" className="text-gray-200 text-2xl block mb-2">Email</label>
                    <input 
                        className="w-70 h-12 px-4 bg-[#2D333B] border border-gray-600 rounded-lg 
                        text-white text-base placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200
                        hover:border-gray-500"
                        type="email"
                        id="email"
                        placeholder="exemplo@email.com"
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
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="text-red-400 text-sm">{error}</div>}

                <button 
                    className="rounded bg-[#238636] hover:bg-[#2ea043] transition text-white h-10 w-full font-semibold"
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