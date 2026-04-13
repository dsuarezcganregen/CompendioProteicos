import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useComparator } from '../context/ComparatorContext'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/comparar', label: 'Comparador' },
  { to: '/glosario', label: 'Glosario' },
  { to: '/acerca', label: 'Acerca de' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { selected } = useComparator()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-bg-card border-b border-bg-alt sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img src={import.meta.env.BASE_URL + 'logo.png'} alt="Ganadería Regenerativa" className="h-10 w-10 rounded-full" />
            <span className="text-text-primary font-heading text-lg hidden sm:block">Compendio Proteico</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm no-underline transition-colors ${
                  location.pathname === link.to
                    ? 'text-green-brand font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                {link.to === '/comparar' && selected.length > 0 && (
                  <span className="ml-1 bg-green-brand text-bg-primary text-xs rounded-full px-1.5 py-0.5">
                    {selected.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-text-primary p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-bg-alt px-4 py-2 bg-bg-card">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm no-underline ${
                  location.pathname === link.to
                    ? 'text-green-brand font-semibold'
                    : 'text-text-secondary'
                }`}
              >
                {link.label}
                {link.to === '/comparar' && selected.length > 0 && (
                  <span className="ml-1 bg-green-brand text-bg-primary text-xs rounded-full px-1.5 py-0.5">
                    {selected.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {selected.length > 0 && location.pathname !== '/comparar' && (
        <div className="fixed bottom-0 left-0 right-0 bg-bg-card border-t border-green-brand/30 p-3 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-text-secondary text-sm">
              {selected.length} especie{selected.length > 1 ? 's' : ''} seleccionada{selected.length > 1 ? 's' : ''}
            </span>
            <Link
              to="/comparar"
              className="bg-green-brand hover:bg-green-dark text-bg-primary px-4 py-2 rounded-lg text-sm font-semibold no-underline transition-colors"
            >
              Ver comparación
            </Link>
          </div>
        </div>
      )}

      <footer className="bg-bg-card border-t border-bg-alt py-6 px-4 text-center">
        <p className="text-text-muted text-sm">
          REGENERA360 · <a href="https://ganaderiaregenerativa.com" target="_blank" rel="noopener noreferrer" className="text-green-brand hover:text-green-light no-underline">GanaderíaRegenerativa.com</a>
        </p>
        <p className="text-text-muted text-xs mt-1">Material educativo para uso de alumnos</p>
      </footer>
    </div>
  )
}
