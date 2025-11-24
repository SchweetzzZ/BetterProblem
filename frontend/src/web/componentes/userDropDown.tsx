import { Link } from 'react-router-dom'
import type { UserDropProps } from '../validation/userDropValidation'

export function UsersDropdown({
    isOpen, 
    isLoading,
    error,
    users,
    onOpen,
    onClose
}: UserDropProps) {
    return (
        <div 
          className="navItem"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <span className="navLink">Usuários ▾</span>
    
          {isOpen && (
            <ul className="dropdown">
              {isLoading && <li className="dropdownItem">Carregando...</li>}
    
              {error && <li className="dropdownItem error">{error}</li>}
    
              {!isLoading && !error && users.length === 0 && (
                <li className="dropdownItem">Nenhum usuário encontrado</li>
              )}
    
              {!isLoading && !error && users.map(u => (
                <li key={u.id} className="dropdownItem">
                  <Link 
                    to={`/usuario/${u.id}`}
                    className="dropdownLink"
                    onClick={onClose}
                  >
                    {u.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
    )
}
