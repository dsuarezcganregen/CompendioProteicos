import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import speciesData from '../data/species.json'
import { SECTIONS } from '../utils/categories'
import SearchBar from './SearchBar'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const sectionCounts = useMemo(() => {
    const counts = {}
    SECTIONS.forEach(s => {
      counts[s.key] = speciesData.filter(s.filter).length
    })
    counts.total = speciesData.length
    return counts
  }, [])

  const handleSearch = (val) => {
    setSearch(val)
    if (val.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(val.trim())}`)
    }
  }

  const sectionCards = [
    ...SECTIONS.map(s => ({ ...s, count: sectionCounts[s.key] })),
    { key: 'total', label: 'Total del Compendio', icon: '📋', count: sectionCounts.total },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <img
          src={import.meta.env.BASE_URL + 'logo.png'}
          alt="Ganadería Regenerativa"
          className="w-24 h-24 mx-auto mb-6 rounded-full"
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-text-primary mb-3">
          Compendio de Suplementos Proteicos
        </h1>
        <p className="text-text-secondary text-lg md:text-xl">
          Para Ganadería Bovina Latinoamericana
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar value={search} onChange={handleSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectionCards.map(card => (
          <Link
            key={card.key}
            to={card.key === 'total' ? '/catalogo' : `/catalogo?seccion=${card.key}`}
            className="bg-bg-card border border-bg-alt rounded-xl p-6 text-center no-underline hover:border-green-brand/40 transition-all group"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="text-text-primary font-heading text-base font-semibold mb-1 group-hover:text-green-brand transition-colors">
              {card.label}
            </h3>
            <p className="text-green-brand text-2xl font-bold">{card.count}</p>
            <p className="text-text-muted text-xs">fuentes</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
