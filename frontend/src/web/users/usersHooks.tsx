import { useState, useCallback } from 'react'

export function useUsers() {
    const [users, setUsers] = useState([])          // corrigido
    const [isLoading, setIsLoading] = useState(false)  // corrigido
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:3000/users')
            const result = await response.json()

            if (result.success) {
                setUsers(result.data)   // corrigido
            } else {
                setUsers([]) 
            }
        } catch (err) {
            console.error(err)
            setError('Falha ao carregar usuários')
            setUsers([])               // corrigido
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        users,
        isLoading,
        error,
        fetchUsers
    }
}
