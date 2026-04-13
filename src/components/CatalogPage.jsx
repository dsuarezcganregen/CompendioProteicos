import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import speciesData from '../data/species.json'
import { SECTIONS } from '../utils/categories'
import SearchBar from './SearchBar'
import Filters from './Filters'
import SpeciesCard from './SpeciesCard'

export default function CatalogPage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState({
    section: searchParams.get('seccion') || '',
    subcategory: '',
    climate: '',
    proteinMin: 0,
    proteinMax: 50,
  })

  useEffect(() => {
    const q = searchParams.get('q')
    const seccion = searchParams.get('seccion')
    if (q) setSearch(q)
    if (seccion) setFilters(f => ({ ...f, section: seccion }))
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = [...speciesData]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(s =>
        s.commonName.toLowerCase().includes(q) ||
        s.scientificName.toLowerCase().includes(q) ||
        (s.otherNames && s.otherNames.toLowerCase().includes(q)) ||
        s.uses.toLowerCase().includes(q) ||
        s.benefits.toLowerCase().includes(q) ||
        (s.family && s.family.toLowerCase().includes(q))
      )
    }

    if (filters.section) {
      const sec = SECTIONS.find(s => s.key === filters.section)
      if (sec) result = result.filter(sec.filter)
    }

    if (filters.subcategory) {
      result = result.filter(s => s.category === filters.subcategory)
    }

    if (filters.climate) {
      result = result.filter(s => s.climate === filters.climate)
    }

    result = result.filter(s =>
      s.proteinMin >= filters.proteinMin && s.proteinMax <= filters.proteinMax
    )

    return result
  }, [search, filters])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl text-text-primary mb-6">Catálogo de Especies</h1>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <Filters filters={filters} onChange={setFilters} />

      <p className="text-text-muted text-sm my-4">
        Mostrando {filtered.length} de {speciesData.length} especies
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(species => (
          <SpeciesCard key={species.id} species={species} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">No se encontraron especies con los filtros actuales.</p>
          <button
            onClick={() => { setSearch(''); setFilters({ section: '', subcategory: '', climate: '', proteinMin: 0, proteinMax: 50 }) }}
            className="mt-4 text-green-brand hover:text-green-light text-sm"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}
