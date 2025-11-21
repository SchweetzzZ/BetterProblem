import { useState, useCallback } from 'react'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:3000/category')
      const result = await response.json()

      if (result.success) {
        setCategories(result.data)
      } else {
        setCategories([])
      }
    } catch (err) {
      console.error(err)
      setError('Falha ao carregar categorias')
      setCategories([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    categories,
    isLoading,
    error,
    fetchCategories
  }
}
