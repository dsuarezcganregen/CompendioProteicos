import { Link } from 'react-router-dom'
import { useComparator } from '../context/ComparatorContext'
import { getCategoryLabel, CATEGORY_INFO, CLIMATE_LABELS } from '../utils/categories'

export default function SpeciesCard({ species }) {
  const { toggle, isSelected } = useComparator()
  const catInfo = CATEGORY_INFO[species.category] || {}
  const selected = isSelected(species.id)

  return (
    <div className={`bg-bg-card rounded-xl border transition-all hover:border-green-brand/40 ${selected ? 'border-green-brand/60 ring-1 ring-green-brand/20' : 'border-bg-alt'}`}>
      <Link to={`/especie/${species.id}`} className="block p-5 no-underline">
        <h3 className="text-text-primary text-lg font-heading font-semibold mb-1">
          {species.commonName}
        </h3>
        <p className="text-text-muted text-sm italic mb-3 line-clamp-1">
          {species.scientificName}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catInfo.color || 'bg-gray-600'} text-white`}>
            {getCategoryLabel(species.category)}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-bg-alt text-text-secondary">
            {CLIMATE_LABELS[species.climate] || species.climate}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-brand/15 text-green-light font-medium">
            {species.proteinMin}–{species.proteinMax}% PC
          </span>
        </div>
      </Link>
      <div className="px-5 pb-4">
        <button
          onClick={() => toggle(species)}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
            selected
              ? 'bg-green-brand/20 text-green-light border border-green-brand/30'
              : 'bg-bg-alt text-text-secondary hover:bg-bg-alt/80 hover:text-text-primary border border-transparent'
          }`}
        >
          {selected ? '✓ En comparador' : '+ Comparar'}
        </button>
      </div>
    </div>
  )
}
