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
    <div className="bg-linear-to-b from-black via-black to-white h-screen">
      <header className="flex flex-col justify-content-center items-center bg-[#fde400]">
        {/* Container principal para logo e input na mesma linha */}
        <div className="flex items-center justify-between w-full max-w-6xl py-4">
          {/* Logo à esquerda */}
          <div className="flex-1">
            <a 
              href="https://www.mercadolivre.com.br/assinaturas/melimais/planos?plan
selected=MEGA#origin=bannermenu_NoLoyals#DEAL_ID=&S=MKT&V=1&T=MS&L=BM_SOV
LOYALTY_ACQUISITION_MELIMAISMEGAALL_SEG_1311&me.audience=all&me.bu=3&me.b
line=26&me.component_id=banner_menu_web_ml&me.content_id=BM_SOV_LOYALTY_A
MELIMAISMEGAALL_SEG_1311&me.flow=-1&me.logic=user_journey&me.position=0"
              className="inline-block"
            >
              <img 
                className="w-32 h-auto" 
                src="/mercadolivre.webp" 
                alt="Mercado Livre Logo" 
              />
            </a>
          </div>

          {/* Input no meio com margem */}
          <div className="flex-1 flex justify-center">
            <input 
              className="w-full max-w-lg h-12 px-4 rounded-lg bg-white text-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Buscar produtos" 
              type="search" 
            />
          </div>

          {/* Espaço vazio à direita para balancear */}
          <div className="flex-1"></div>
        </div>

        {/* Menu de navegação */}
        <div className="flex justify-center items-center gap-8 py-4 w-full max-w-6xl">
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
          <Link to="/cupons" className="navLink hover:text-blue-600 transition-colors">Cupons</Link>
          <Link to="/supermercado" className="navLink hover:text-blue-600 transition-colors">Supermercado</Link>
          <Link to="/supermercado" className="navLink hover:text-blue-600 transition-colors">Moda</Link>
        </div>
      </header>

      <main className="containerDaHome py-8">                                
        <h1 className="text-3xl font-bold text-center text-gray-800">
          COMPRE SEU CARRO POR CARROCERIA
        </h1>
      </main>
    </div>
  )
}