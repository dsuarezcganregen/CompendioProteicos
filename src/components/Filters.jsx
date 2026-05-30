import { useState, useMemo } from 'react'
import { SECTIONS } from '../utils/categories'
import speciesData from '../data/species.json'

const SUBCATEGORIES = [
  { value: 'tropical_arborea', label: 'Arbórea tropical' },
  { value: 'tropical_arbustiva', label: 'Arbustiva tropical' },
  { value: 'tropical_rastrera', label: 'Rastrera tropical' },
  { value: 'tropical_no_convencional', label: 'No conv. tropical' },
  { value: 'templado_arborea', label: 'Arbórea templada' },
  { value: 'templado_perenne', label: 'Perenne templada' },
  { value: 'templado_anual', label: 'Anual templada' },
  { value: 'templado_no_convencional', label: 'No conv. templada' },
]

const CLIMATES = [
  { value: 'tropical', label: 'Tropical' },
  { value: 'templado', label: 'Templado' },
  { value: 'biclimatico', label: 'Biclimático' },
  { value: 'cualquiera', label: 'Cualquiera' },
]

const PROTEIN_MAX = Math.max(...speciesData.map(s => s.proteinMax))

export default function Filters({ filters, onChange }) {
  const [open, setOpen] = useState(false)

  const setFilter = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  const content = (
    <div className="space-y-5">
      <div>
        <h4 className="text-text-secondary text-xs uppercase tracking-wider mb-2 font-semibold">Sección</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('section', '')}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!filters.section ? 'bg-green-brand text-bg-primary' : 'bg-bg-alt text-text-secondary hover:text-text-primary'}`}
          >
            Todas
          </button>
          {SECTIONS.map(s => (
            <button
              key={s.key}
              onClick={() => setFilter('section', s.key)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filters.section === s.key ? 'bg-green-brand text-bg-primary' : 'bg-bg-alt text-text-secondary hover:text-text-primary'}`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-text-secondary text-xs uppercase tracking-wider mb-2 font-semibold">Subcategoría</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('subcategory', '')}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!filters.subcategory ? 'bg-green-brand text-bg-primary' : 'bg-bg-alt text-text-secondary hover:text-text-primary'}`}
          >
            Todas
          </button>
          {SUBCATEGORIES.map(sc => (
            <button
              key={sc.value}
              onClick={() => setFilter('subcategory', sc.value)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filters.subcategory === sc.value ? 'bg-green-brand text-bg-primary' : 'bg-bg-alt text-text-secondary hover:text-text-primary'}`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-text-secondary text-xs uppercase tracking-wider mb-2 font-semibold">Clima</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('climate', '')}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!filters.climate ? 'bg-green-brand text-bg-primary' : 'bg-bg-alt text-text-secondary hover:text-text-primary'}`}
          >
            Todos
          </button>
          {CLIMATES.map(c => (
            <button
              key={c.value}
              onClick={() => setFilter('climate', c.value)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filters.climate === c.value ? 'bg-green-brand text-bg-primary' : 'bg-bg-alt text-text-secondary hover:text-text-primary'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-text-secondary text-xs uppercase tracking-wider mb-2 font-semibold">
          Proteína Cruda: {filters.proteinMin}% – {filters.proteinMax}%
        </h4>
        <div className="flex items-center gap-3">
          <span className="text-text-muted text-xs">0%</span>
          <input
            type="range"
            min="0"
            max={PROTEIN_MAX}
            value={filters.proteinMin}
            onChange={(e) => setFilter('proteinMin', Math.min(Number(e.target.value), filters.proteinMax))}
            className="flex-1 accent-green-brand"
          />
          <input
            type="range"
            min="0"
            max={PROTEIN_MAX}
            value={filters.proteinMax}
            onChange={(e) => setFilter('proteinMax', Math.max(Number(e.target.value), filters.proteinMin))}
            className="flex-1 accent-green-brand"
          />
          <span className="text-text-muted text-xs">{PROTEIN_MAX}%</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full bg-bg-card border border-bg-alt rounded-xl px-4 py-3 text-left text-text-secondary text-sm flex items-center justify-between mb-4"
      >
        <span>Filtros</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`md:block ${open ? 'block' : 'hidden'}`}>
        <div className="bg-bg-card border border-bg-alt rounded-xl p-5">
          {content}
        </div>
      </div>
    </>
  )
}
