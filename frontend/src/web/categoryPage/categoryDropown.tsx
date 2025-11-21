import { Link } from 'react-router-dom'
import type { CategoriesDropdownProps} from './categoryValidation'

export function CategoriesDropdown({
  isOpen,
  isLoading,
  error,
  categories,
  onOpen,
  onClose
}: CategoriesDropdownProps) {
  return (
    <div 
      className="navItem"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <span className="navLink">Categorias ▾</span>

      {isOpen && (
        <ul className="dropdown">
          {isLoading && <li className="dropdownItem">Carregando...</li>}

          {error && <li className="dropdownItem error">{error}</li>}

          {!isLoading && !error && categories.length === 0 && (
            <li className="dropdownItem">Nenhuma categoria cadastrada</li>
          )}

          {!isLoading && !error && categories.map(c => (
            <li key={c.id} className="dropdownItem">
              <Link 
                to={`/categoria/${c.name}`}
                className="dropdownLink"
                onClick={onClose}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
