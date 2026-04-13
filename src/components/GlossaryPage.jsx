import { useState, useMemo } from 'react'
import glossaryData from '../data/glossary.json'
import SearchBar from './SearchBar'

const sortedGlossary = [...glossaryData].sort((a, b) => a.term.localeCompare(b.term, 'es'))

export default function GlossaryPage() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return sortedGlossary
    const q = search.toLowerCase()
    return sortedGlossary.filter(entry =>
      entry.term.toLowerCase().includes(q) ||
      (entry.abbreviation && entry.abbreviation.toLowerCase().includes(q)) ||
      entry.definition.toLowerCase().includes(q)
    )
  }, [search])

  const letters = useMemo(() => {
    const set = new Set(filtered.map(e => e.term[0].toUpperCase()))
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'))
  }, [filtered])

  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl text-text-primary mb-6">Glosario de Términos</h1>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar término..." />
      </div>

      <div className="flex flex-wrap gap-1 mb-8">
        {allLetters.map(letter => {
          const has = letters.includes(letter)
          return (
            <a
              key={letter}
              href={has ? `#letra-${letter}` : undefined}
              className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium no-underline transition-colors ${
                has
                  ? 'bg-bg-card text-green-brand hover:bg-green-brand hover:text-bg-primary'
                  : 'bg-bg-card/50 text-text-muted/30 cursor-default'
              }`}
            >
              {letter}
            </a>
          )
        })}
      </div>

      <div className="space-y-1">
        {letters.map(letter => (
          <div key={letter} id={`letra-${letter}`}>
            <h2 className="text-green-brand text-xl font-heading mb-3 mt-8 pt-4 border-t border-bg-alt">
              {letter}
            </h2>
            {filtered
              .filter(e => e.term[0].toUpperCase() === letter)
              .map(entry => (
                <div
                  key={entry.term}
                  id={entry.term.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}
                  className="bg-bg-card border border-bg-alt rounded-xl p-4 mb-3"
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-text-primary font-semibold text-base">{entry.term}</h3>
                    {entry.abbreviation && (
                      <span className="text-text-muted text-sm">({entry.abbreviation})</span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{entry.definition}</p>
                </div>
              ))}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">No se encontraron términos.</p>
        </div>
      )}
    </div>
  )
}
