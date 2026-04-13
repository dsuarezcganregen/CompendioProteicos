import { useParams, Link, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import speciesData from '../data/species.json'
import { getCategoryLabel, CATEGORY_INFO, CLIMATE_LABELS } from '../utils/categories'
import { useComparator } from '../context/ComparatorContext'
import { renderWithGlossary } from './GlossaryTooltip'

function Section({ icon, title, children, variant }) {
  const base = 'rounded-xl p-5 mb-4'
  const styles = {
    benefit: `${base} bg-benefit-bg border border-benefit-border/40`,
    risk: `${base} bg-risk-bg border border-risk-border/40`,
    default: `${base} bg-bg-card border border-bg-alt`,
  }
  return (
    <div className={styles[variant] || styles.default}>
      <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-3 flex items-center gap-2 font-semibold">
        <span>{icon}</span> {title}
      </h3>
      <div className="text-text-primary text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export default function SpeciesDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggle, isSelected } = useComparator()

  const currentIndex = useMemo(() => speciesData.findIndex(s => s.id === id), [id])
  const species = speciesData[currentIndex]
  const prev = currentIndex > 0 ? speciesData[currentIndex - 1] : null
  const next = currentIndex < speciesData.length - 1 ? speciesData[currentIndex + 1] : null

  if (!species) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-text-muted text-lg">Especie no encontrada.</p>
        <Link to="/catalogo" className="text-green-brand hover:text-green-light mt-4 inline-block">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  const catInfo = CATEGORY_INFO[species.category] || {}
  const selected = isSelected(species.id)

  const useTags = species.uses.split(',').map(u => u.trim()).filter(Boolean)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/catalogo" className="text-text-muted hover:text-text-primary text-sm no-underline mb-6 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al catálogo
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-text-primary mb-2">{species.commonName}</h1>
        <p className="text-text-secondary text-lg italic mb-4">{species.scientificName}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${catInfo.color || 'bg-gray-600'} text-white`}>
            {getCategoryLabel(species.category)}
          </span>
          <span className="text-sm px-3 py-1 rounded-full bg-bg-alt text-text-secondary">
            {CLIMATE_LABELS[species.climate] || species.climate}
          </span>
          <span className="text-sm px-3 py-1 rounded-full bg-green-brand/15 text-green-light font-medium">
            {species.proteinMin}–{species.proteinMax}% PC
          </span>
          <button
            onClick={() => toggle(species)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              selected
                ? 'bg-green-brand/20 text-green-light border border-green-brand/30'
                : 'bg-bg-alt text-text-secondary hover:text-text-primary border border-transparent'
            }`}
          >
            {selected ? '✓ En comparador' : '+ Comparar'}
          </button>
        </div>
      </div>

      <div className="space-y-0">
        <Section icon="🏷️" title="Identificación">
          {species.otherNames && (
            <p className="mb-2"><span className="text-text-muted">Otros nombres:</span> {species.otherNames}</p>
          )}
          {species.family && (
            <p className="mb-2"><span className="text-text-muted">Familia:</span> {species.family}</p>
          )}
          {species.habit && (
            <p><span className="text-text-muted">Hábito:</span> {renderWithGlossary(species.habit)}</p>
          )}
        </Section>

        <Section icon="🌍" title="Origen y Distribución">
          {renderWithGlossary(species.originDistribution)}
        </Section>

        <Section icon="🏔️" title="Adaptación">
          {renderWithGlossary(species.adaptation)}
        </Section>

        <Section icon="🧪" title="Proteína Cruda">
          {renderWithGlossary(species.protein)}
        </Section>

        <Section icon="📊" title="Digestibilidad">
          {renderWithGlossary(species.digestibility)}
        </Section>

        <Section icon="🔧" title="Formas de Uso">
          <div className="flex flex-wrap gap-2">
            {useTags.map((tag, i) => (
              <span key={i} className="bg-bg-alt text-text-secondary text-xs px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </Section>

        <Section icon="✅" title="Beneficios" variant="benefit">
          {renderWithGlossary(species.benefits)}
        </Section>

        <Section icon="⚠️" title="Cuidados y Riesgos" variant="risk">
          {renderWithGlossary(species.risks)}
        </Section>
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-bg-alt">
        {prev ? (
          <Link to={`/especie/${prev.id}`} className="text-text-secondary hover:text-green-brand text-sm no-underline flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {prev.commonName}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/especie/${next.id}`} className="text-text-secondary hover:text-green-brand text-sm no-underline flex items-center gap-1">
            {next.commonName}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : <span />}
      </div>
    </div>
  )
}
