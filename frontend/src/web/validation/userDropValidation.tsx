export interface Users {
    id: number
    name: string
    email: string
}

export interface UserDropProps {
    isOpen: boolean
    isLoading: boolean
    error: string | null
    users: Users[]
    onOpen: () => void
    onClose: () => void
}