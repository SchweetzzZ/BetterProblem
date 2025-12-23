import { useState, useCallback } from 'react'

export function useUsers() {
    const [users, setUsers] = useState([])      
    const [isLoading, setIsLoading] = useState(false)  
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:3000/users')
            const result = await response.json()

            if (result.success) {
                setUsers(result.data)   
            } else {
                setUsers([]) 
            }
        } catch (err) {
            console.error(err)
            setError('Falha ao carregar usuários')
            setUsers([])               
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
