
export interface Category {
    id: number
    name: string
    description: string
  }
  
  export interface CategoriesDropdownProps {
    isOpen: boolean
    isLoading: boolean
    error: string | null
    categories: Category[]
    onOpen: () => void
    onClose: () => void
  }