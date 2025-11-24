import './homePage.css'
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { useCategories } from '../categoryPage/hooksCategory'
import { useUsers } from '../users/usersHooks'

import { CategoriesDropdown } from '../componentes/categoryDropown'
import { UsersDropdown } from '../componentes/userDropDown'

export const HomePage = () => {
  const { categories, isLoading: isLoadingCategories, error: errorCategories, fetchCategories } = useCategories()
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const OpenCategory = useCallback(() => {
    setIsCategoryOpen(true)
    if (categories.length === 0 && !isLoadingCategories) {
      fetchCategories()
    }
  }, [categories.length, isLoadingCategories, fetchCategories])

  const closeCategory = useCallback(() => {
    setIsCategoryOpen(false)
  }, [])

  //=====USUARIOS======

  const {
    users,
    isLoading: isLoadingUsers,
    error: usersError,
    fetchUsers
  } = useUsers()

  const [isUsersOpen, setIsUsersOpen] = useState(false)

  const openUsers = useCallback(() => {
    setIsUsersOpen(true)
    if (users.length === 0 && !isLoadingUsers) {
      fetchUsers()
    }
  }, [users.length, isLoadingUsers, fetchUsers])

  const closeUsers = useCallback(() => {
    setIsUsersOpen(false)
  }, [])
  

  return (
    <div className="backGroundGeralDaHome">
      <header className="topBar">
        <div className="searchRow">
          <input className="busca" placeholder="Buscar produtos" type="search" />
        </div>

        <div className="navRow">
          <CategoriesDropdown
            isOpen={isCategoryOpen}
            isLoading={isLoadingCategories}
            categories={categories}
            error={errorCategories}
            onOpen={OpenCategory}
            onClose={closeCategory}
          />

          <UsersDropdown
            isOpen={isUsersOpen}
            isLoading={isLoadingUsers}
            error={usersError}
            users={users}
            onOpen={openUsers}
            onClose={closeUsers}
          />
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
