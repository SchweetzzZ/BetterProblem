import './homePage.css'
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useCategories } from '../categoryPage/hooksCategory'
import { CategoriesDropdown } from '../componentes/categoryDropown'

export const HomePage = () => {
  const { categories, isLoading, error, fetchCategories } = useCategories()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setIsDropdownOpen(true)
    if (categories.length === 0 && !isLoading) {
      fetchCategories()
    }
  }, [categories.length, isLoading, fetchCategories])

  const handleClose = useCallback(() => {
    setIsDropdownOpen(false)
  }, [])

  return (
    <div className="backGroundGeralDaHome">
      <header className="topBar">
        <div className="searchRow">
          <input className="busca" placeholder="Buscar produtos" type="search" />
        </div>

        <div className="navRow">
          <CategoriesDropdown
            isOpen={isDropdownOpen}
            isLoading={isLoading}
            categories={categories}
            error={error}
            onOpen={handleOpen}
            onClose={handleClose}
          />

          <Link to="/ofertas" className="navLink">Oferta</Link>
          <Link to="/cupons" className="navLink">Cupons</Link>
          <Link to="/supermercado" className="navLink">Supermercado</Link>
          <Link to="/moda" className="navLink">Moda</Link>
        </div>
      </header>

      <main className="containerDaHome">
        <h1>COMPRE SEU CARRO POR CARROCERIA</h1>
      </main>
    </div>
  )
}
