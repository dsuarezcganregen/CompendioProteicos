import { Link } from 'react-router-dom'
import { useComparator } from '../context/ComparatorContext'
import { getCategoryLabel, CLIMATE_LABELS } from '../utils/categories'

const FIELDS = [
  { key: 'scientificName', label: 'Nombre científico', italic: true },
  { key: 'category', label: 'Categoría', render: getCategoryLabel },
  { key: 'climate', label: 'Clima', render: (v) => CLIMATE_LABELS[v] || v },
  { key: 'protein_range', label: 'PC (%)', render: (_, s) => `${s.proteinMin}–${s.proteinMax}%` },
  { key: 'digestibility', label: 'Digestibilidad', truncate: true },
  { key: 'uses', label: 'Usos principales', truncate: true },
  { key: 'benefits', label: 'Beneficio principal', truncate: true },
  { key: 'risks', label: 'Riesgo principal', truncate: true },
]

function truncate(text, len = 120) {
  if (!text) return '—'
  if (text.length <= len) return text
  return text.slice(0, len) + '...'
}

export default function Comparator() {
  const { selected, remove, clear } = useComparator()

  if (selected.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl md:text-3xl text-text-primary mb-4">Comparador de Especies</h1>
        <p className="text-text-muted mb-6">No hay especies seleccionadas. Agrega especies desde el catálogo o las fichas individuales.</p>
        <Link to="/catalogo" className="bg-green-brand hover:bg-green-dark text-bg-primary px-6 py-3 rounded-lg font-semibold no-underline transition-colors inline-block">
          Ir al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl text-text-primary">Comparador</h1>
        <button onClick={clear} className="text-text-muted hover:text-risk-border text-sm">
          Limpiar selección
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-3 bg-bg-card border-b border-bg-alt text-text-muted text-xs uppercase tracking-wider w-36">
                Campo
              </th>
              {selected.map(s => (
                <th key={s.id} className="p-3 bg-bg-card border-b border-bg-alt text-left">
                  <Link to={`/especie/${s.id}`} className="text-green-brand hover:text-green-light no-underline font-heading font-semibold text-sm">
                    {s.commonName}
                  </Link>
                  <button
                    onClick={() => remove(s.id)}
                    className="ml-2 text-text-muted hover:text-risk-border text-xs"
                    title="Quitar"
                  >
                    ✕
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIELDS.map(field => (
              <tr key={field.key} className="border-b border-bg-alt/50">
                <td className="p-3 text-text-muted text-xs uppercase tracking-wider font-semibold bg-bg-card/50">
                  {field.label}
                </td>
                {selected.map(s => {
                  let val
                  if (field.render) {
                    val = field.render(s[field.key], s)
                  } else {
                    val = s[field.key] || '—'
                  }
                  if (field.truncate && typeof val === 'string') val = truncate(val)

                  return (
                    <td key={s.id} className={`p-3 text-text-primary text-sm ${field.italic ? 'italic' : ''}`}>
                      {val}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
