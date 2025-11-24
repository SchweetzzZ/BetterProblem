// CategoryPage.tsx - CORRIGIDO
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

type Category = { 
  id: number 
  name: string 
  description: string 
}

export const CategoryPage = () => {
  const { name } = useParams()
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      
      if (!name) {
        setError('Nome da categoria não fornecido')
        setIsLoading(false)
        return
      }
      
      setIsLoading(true)
      setError(null)
      
      try {
        const url = `http://localhost:3000/category/name/${name}`
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }
        
        const result = await response.json()
        
        if (result.success && result.data) {
          setCategory(result.data)
        } else {
          setError('Categoria não encontrada no response')
        }
        
      } catch (error: any) {
        setError(`Falha ao carregar categoria: ${error.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
  }, [name])

  if (isLoading) {
    return (
      <div className="category-page">
        <div className="loading">Carregando categoria...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="category-page">
        <div className="error-message">Erro: {error}</div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="category-page">
        <div className="not-found">Categoria não encontrada</div>
      </div>
    )
  }

  return (
    <div className="category-page">
      <header className="category-header">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </header>
      
      <main className="category-content">
        <h2>Produtos da categoria {category.name}</h2>
        <div className="products-grid">
          <div className="product-placeholder">
            <p>🎯 Produtos da categoria "{category.name}" serão listados aqui</p>
            <p>📦 Implemente a busca de produtos por categoria ID: {category.id}</p>
          </div>
        </div>
      </main>
    </div>
  )
}