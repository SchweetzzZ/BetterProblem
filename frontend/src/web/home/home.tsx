// HomePage.tsx - Versão com navegação entre rotas
import './homePage.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type Category = { 
  id: number 
  name: string 
  description: string 
}

export const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Busca categorias do backend
  const fetchCategories = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:3000/category')
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      
      if (result.success && result.data) {
        setCategories(result.data)
      } else {
        setCategories([])
      }
      
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      setError('Falha ao carregar categorias')
      setCategories([])
    } finally {
      setIsLoading(false)
    }
  }

  // Abre dropdown e busca categorias
  const handleDropdownOpen = () => {
    setIsDropdownOpen(true)
    if (categories.length === 0 && !isLoading) {
      fetchCategories()
    }
  }

  return (
    <div className="backGroundGeralDaHome">
      <header className="topBar">
        <div className="searchRow">
          <input
            name="busca"
            id="busca"
            className="busca"
            placeholder="Buscar produtos e muito mais"
            type="search"
          />
        </div>

        <div className="navRow">
          {/* Dropdown de Categorias */}
          <div 
            className="navItem"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="navLink">Categorias ▾</span>
            
            {isDropdownOpen && (
              <ul className="dropdown">
                {isLoading && <li className="dropdownItem">Carregando...</li>}
                
                {error && <li className="dropdownItem error">{error}</li>}
                
                {!isLoading && !error && categories.length === 0 && (
                  <li className="dropdownItem">Nenhuma categoria cadastrada</li>
                )}
                
                {!isLoading && !error && categories.map(category => (
                  <li key={category.id} className="dropdownItem">
                    <Link 
                      to={`/categoria/${category.name}`}
                      className="dropdownLink"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/ofertas" className="navLink">Oferta</Link>
          <Link to="/cupons" className="navLink">Cupons</Link>
          <Link to="/supermercado" className="navLink">Supermercado</Link>
          <Link to="/moda" className="navLink">Moda</Link>
        </div>
      </header>

      <main className="containerDaHome">
        <h1>COMPRE SEU CARRO POR CARROCERIA</h1>
        <h2>CARROS MAIS POPULARES</h2>
        <h3>AS MELHORES MARCAS</h3>
      </main>
    </div>
  )
}